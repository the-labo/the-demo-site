/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose,} = require('the-controller-mixins')

const AdminCtrlBase = compose(

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
