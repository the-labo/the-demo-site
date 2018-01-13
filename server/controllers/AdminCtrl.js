/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth} = require('./concerns')

const AdminCtrlBase = compose(
  withAuth,
  withDebug
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
