/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const cn = require('./concerns')
const {TheError, TheNotFoundError} = require('the-error')
const WrongPasswordError = TheError.withName('WrongPasswordError')
const {RoleCodes} = require('@self/conf')

/** @lends SignCtrl */
const SignCtrl = cn.compose(
  cn.withDebug,
  cn.withAuthorized
)(
  class SignCtrlBase extends TheCtrl {

    async signup (name, password, options = {}) {
      const s = this
      const {profile: profileAttributes = {}} = options
      const {
        db: {
          resources: {User, Role, Sign, Profile}
        }
      } = s.app
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
      await s._setAuthorized(user, sign)
      return user
    }

    async signin (name, password) {
      const s = this
      const {
        db: {
          resources: {User, Sign, Profile}
        }
      } = s.app
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
      await sign.update({signinAt: new Date()})
      await user.update({profile, sign})
      await s._setAuthorized(user, sign)
      return user
    }

    async signout () {
      const s = this
      const {
        db: {
          resources: {Sign}
        }
      } = s.app
      await s._reloadAuthorized()
      const authorized = await s._getAuthorized()
      if (authorized) {
        const {sign} = authorized
        if (sign) {
          await Sign.update(sign.id, {signoutAt: new Date()})
        }
        await s._delAuthorized()
      }
      return !!authorized
    }

    async signdel () {
      const s = this
      const {
        db: {
          resources: {User, Sign, Profile}
        }
      } = s.app
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

module.exports = SignCtrl
