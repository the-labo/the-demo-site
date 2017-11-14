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
      const {signed} = await s._getAuthorized()
      const sign = await Sign.one(signed.sign.id)
      const ok = sign.verifyPassword(password)
      if (ok) {
        await s._setConfirmedAsAdmin(true)
      }
      return ok
    }
  }
)

module.exports = AdminCtrl
