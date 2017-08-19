/**
 * SignCtrl
 * @class SignCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const {withDebug, withSigned} = require('./concerns')
const {TheError, TheNotFoundError} = require('the-error')
const WrongPasswordError = TheError.withName('WrongPasswordError')

/** @lends SignCtrl */
class SignCtrl extends TheCtrl {

  async getSigned () {
    const s = this
    return s._getSigned()
  }

  async signup (name, password, options = {}) {
    const s = this
    const {profile: profileAttributes = {}, roleCode} = options
    const {app} = s
    const {User, Role, Sign, Profile} = app.db.resources
    const role = roleCode ? await Role.ofCode(roleCode) : undefined
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
    s._setSigned(user, sign)
    return user
  }

  async signin (name, password) {
    const s = this
    const {app} = s
    const {User, Sign, Profile} = app.db.resources
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
    await sign.update({signinAt: new Date()})
    s._setSigned(user, sign)
    return user
  }

  async signout () {
    const s = this
    const {app} = s
    const {Sign} = app.db.resources
    await s._reloadSigned()
    const signed = s._getSigned()
    if (signed) {
      const {sign} = signed
      if (sign) {
        await Sign.update(sign.id, {signoutAt: new Date()})
      }
      s._delSigned()
    }
    return !!signed
  }

  async signdel () {
    const s = this
    const {app} = s
    const {Sign, User} = app.db.resources
    await s._reloadSigned()
    const signed = s._getSigned()
    if (!signed) {
      return false
    }
    const {user, sign} = signed
    await Sign.destroy(sign.id)
    await User.destroy(user.id)
    return true
  }

  async updateProfile (profileAttributes) {
    const s = this
    await s._assertSigned()
    const {app} = s
    const {User, Profile} = app.db.resources
    const signed = await s.getSigned()
    const user = await User.one(signed.user.id)
    const profile = await Profile.ofUser(user)
    await user.update({profile})
    const {email} = profileAttributes
    const needsVerify = email && (email !== profile.email)
    if (needsVerify) {
      profileAttributes.emailVerified = false
    }
    await profile.update(profileAttributes)
    await s._reloadSigned()
    return true
  }

  async updatePassword ({newPassword} = {}) {
    const s = this
    await s._assertSigned()
    const {app} = s
    const {User, Sign} = app.db.resources
    const signed = await s.getSigned()
    const user = await User.one(signed.user.id)
    await Sign.setUserPassword(user, newPassword)
    await s._reloadSigned()
    return true
  }
}

module.exports = withSigned(
  withDebug(
    SignCtrl, 'app:SignCtrl'
  )
)
