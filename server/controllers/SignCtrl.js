/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {RoleCodes} = require('@self/conf')

/** @lends SignCtrl */
const SignCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class SignCtrlBase extends Ctrl {
    async signUp (name, password, options = {}) {
      const s = this
      const {profile: profileAttributes = {}} = options
      const {signService} = s.services

      const roleCode = RoleCodes.NORMAL_ROLE
      const {user, sign} = await signService.processSignUp({name, password, profileAttributes, roleCode})
      await s._setAuthorized({user, sign})
      return user
    }

    async signIn (name, password) {
      const s = this
      const {signService} = s.services

      const {sign, user} = await signService.processSignIn({name, password})
      await s._setAuthorized({user, sign})
      return user
    }

    async signOut () {
      const s = this
      const {signService} = s.services
      await s._reloadAuthorized()
      const user = await s._fetchAuthorizedUser()
      if (user) {
        await signService.processSignOut({userId: user.id})
        await s._delAuthorized()
      }
      return !!user
    }
  }
)

module.exports = SignCtrl
