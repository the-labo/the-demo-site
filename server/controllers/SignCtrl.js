/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const { compose } = require('the-controller-mixins')
const { RoleCodes } = require('@self/conf')
const Ctrl = require('./Ctrl')

const SignCtrlBase = compose(

)(Ctrl)

/** @lends SignCtrl */
class SignCtrl extends SignCtrlBase {
  async signIn (name, password) {
    const {
      lang,
      services: { signService },
    } = this
    const { sign, user } = await signService.processSignIn({
      lang, name, password,
    })
    await this._setAuthorized({ sign, user })
    return user
  }

  async signOut () {
    const {
      services: { signService },
      user,
    } = this
    await this._reloadAuthorized()
    if (user) {
      await signService.processSignOut({ userId: user.id })
    }
    await this._delAuthorized()
    return !!user
  }

  async signUp (name, password, options = {}) {
    const { profile: profileAttributes = {} } = options
    const {
      lang,
      services: { signService },
    } = this
    const roleCode = RoleCodes.NORMAL_ROLE
    const { sign, user } = await signService.processSignUp({
      lang, name, password, profileAttributes, roleCode,
    })
    await this._setAuthorized({ sign, user })
    return user
  }
}

module.exports = SignCtrl
