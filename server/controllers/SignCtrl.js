/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, } = require('the-controller-mixins')
const {RoleCodes} = require('@self/conf')

const SignCtrlBase = compose(

)(Ctrl)

/** @lends SignCtrl */
class SignCtrl extends SignCtrlBase {
  async signUp (name, password, options = {}) {
    const {profile: profileAttributes = {}} = options
    const {
      services: {signService}
    } = this
    const roleCode = RoleCodes.NORMAL_ROLE
    const {user, sign} = await signService.processSignUp({name, password, profileAttributes, roleCode})
    await this._setAuthorized({user, sign})
    return user
  }

  async signIn (name, password) {
    const {
      services: {signService}
    } = this
    const {sign, user} = await signService.processSignIn({name, password})
    await this._setAuthorized({user, sign})
    return user
  }

  async signOut () {
    const {
      user,
      services: {signService}
    } = this
    await this._reloadAuthorized()
    if (user) {
      await signService.processSignOut({userId: user.id})
      await this._delAuthorized()
    }
    return !!user
  }
}

module.exports = SignCtrl
