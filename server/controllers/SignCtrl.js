/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth} = require('./concerns')
const {RoleCodes} = require('@self/conf')

/** @lends SignCtrl */
const SignCtrl = compose(
  withDebug,
  withAuth
)(
  class SignCtrlBase extends Ctrl {
    async signUp (name, password, options = {}) {
      const {profile: profileAttributes = {}} = options
      const {signService} = this.services
      const roleCode = RoleCodes.NORMAL_ROLE
      const {user, sign} = await signService.processSignUp({name, password, profileAttributes, roleCode})
      await this._setAuthorized({user, sign})
      return user
    }

    async signIn (name, password) {
      const {signService} = this.services
      const {sign, user} = await signService.processSignIn({name, password})
      await this._setAuthorized({user, sign})
      return user
    }

    async signOut () {
      const {signService} = this.services
      await this._reloadAuthorized()
      const user = await this._fetchAuthorizedUser()
      if (user) {
        await signService.processSignOut({userId: user.id})
        await this._delAuthorized()
      }
      return !!user
    }
  }
)

module.exports = SignCtrl
