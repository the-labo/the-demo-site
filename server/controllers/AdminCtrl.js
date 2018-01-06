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
      const s = this
      const {Sign} = s.resources
      await s._assertAuthorized()
      const user = await s._fetchAuthorizedUser()
      const sign = await Sign.of(user)
      const ok = sign.verifyPassword(password)
      if (ok) {
        await s._setConfirmedAsAdmin(true)
      }
      return ok
    }

    async needsConfirmAsAdmin () {
      const s = this
      const isConfirmed = await s._isConfirmedAsAdmin()
      return !isConfirmed
    }
  }
)

module.exports = AdminCtrl
