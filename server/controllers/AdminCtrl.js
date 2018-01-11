/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')

/** @lends AdminCtrl */
const AdminCtrl = cn.compose(
  cn.withAuth,
  cn.withDebug
)(
  class AdminCtrlBase extends Ctrl {
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
)

module.exports = AdminCtrl
