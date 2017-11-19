/**
 * PasswordCtrl
 * @class PasswordCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')

/** @lends PasswordCtrl */
const PasswordCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class PasswordCtrlBase extends Ctrl {
    async update (newPassword) {
      const s = this
      await s._assertAuthorized()
      const {Sign} = s.resources
      const user = await s._fetchAuthorizedUser()
      await Sign.setUserPassword(user, newPassword)
      await s._reloadAuthorized()
      return true
    }
  }
)

module.exports = PasswordCtrl
