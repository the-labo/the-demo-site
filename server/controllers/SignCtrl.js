/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheError, TheNotFoundError} = require('the-error')
const WrongPasswordError = TheError.withName('WrongPasswordError')
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
      const {User, Role, Sign, Profile} = s.resources
      const role = await Role.ofCode(RoleCodes.NORMAL_ROLE)
      const user = await User.create({name, role})
      try {
        const profile = await Profile.ofUser(user)
        await profile.update(
          Object.assign({}, profileAttributes, {emailVerified: false}),
          {errorNamespace: 'profile'}
        )
        await user.update({profile})
      } catch (e) {
        await user.destroy()
        throw e
      }
      const sign = await Sign.setUserPassword(user, password)
      await s._setAuthorized({user, sign})
      return user
    }

    async signIn (name, password) {
      const s = this
      const {User, Sign, Profile} = s.resources
      const user = (await User.first({name})) || (await Profile.userWithEmail(name))
      if (!user) {
        throw new TheNotFoundError(`User not found for name: ${name}`, {
          field: 'name',
          messageKey: 'USER_NOT_FOUND_ERROR'
        })
      }
      const sign = await Sign.ofUser(user)
      const ok = sign.verifyPassword(password)
      if (!ok) {
        throw new WrongPasswordError('Password wrong', {
          field: 'password',
          messageKey: 'PASSWORD_WRONG'
        })
      }
      const profile = await Profile.ofUser(user)
      await sign.update({signInAt: new Date()})
      await user.update({profile, sign})
      await s._setAuthorized({user, sign})
      return user
    }

    async signOut () {
      const s = this
      const {Sign} = s.resources
      await s._reloadAuthorized()
      const authorized = await s._getAuthorized()
      if (authorized) {
        const {sign} = authorized
        if (sign) {
          await Sign.update(sign.id, {signOutAt: new Date()})
        }
        await s._delAuthorized()
      }
      return !!authorized
    }
  }
)

module.exports = SignCtrl
