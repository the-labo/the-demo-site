/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const {compose,} = require('the-controller-mixins')
const {withAdmin,} = require('./concerns')
const Ctrl = require('./Ctrl')

const AdminCtrlBase = compose(
  withAdmin
)(Ctrl)

/** @lends AdminCtrl */
class AdminCtrl extends AdminCtrlBase {
  async confirm (password) {
    await this._assertAuthorized()
    const ok = this._verifyAuthorisedPassword(password)
    await this._setConfirmedAsAdmin(ok)
    return ok
  }

  async needsConfirmAsAdmin () {
    const isConfirmed = await this._isConfirmedAsAdmin()
    return !isConfirmed
  }
}

module.exports = AdminCtrl
