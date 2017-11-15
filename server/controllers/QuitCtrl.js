/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')

/** @lends QuitCtrl */
const QuitCtrl = cn.compose(
  cn.withDebug
)(
  class QuitCtrlBase extends Ctrl {
    async execute () {
      const s = this
      const {User, Sign, Profile} = s.resources
      await s._reloadAuthorized()
      const authorized = await s._getAuthorized()
      if (!authorized) {
        return false
      }
      const {user, sign} = authorized
      const profile = await Profile.ofUser(user)

      await Sign.destroy(sign.id)
      await Profile.destroy(profile.id)
      await User.destroy(user.id)

      return true
    }
  }
)

module.exports = QuitCtrl
