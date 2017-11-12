/**
 * AccountCtrl
 * @class AccountCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const cn = require('./concerns')

/** @lends AccountCtrl */
const AccountCtrl = cn.compose(
  cn.withDebug,
  cn.withAuthorized
)(
  class AccountCtrlBase extends TheCtrl {
    async getCurrentUser () {
      const s = this
      const authorized = await s._getAuthorized()
      return authorized ? authorized.user : null
    }

    async updateProfile (profileAttributes) {
      const s = this
      await s._assertAuthorized()
      const {
        db: {
          resources: {Profile}
        }
      } = s.app
      const user = await s._fetchAuthorizedUser()
      const profile = await Profile.ofUser(user)
      await user.update({profile})
      const {email} = profileAttributes
      const needsVerify = email && (email !== profile.email)
      if (needsVerify) {
        profileAttributes.emailVerified = false
      }
      await profile.update(Object.assign({}, profileAttributes, {user}))
      await s._reloadAuthorized()
      return true
    }

    async updatePassword (newPassword) {
      const s = this
      await s._assertAuthorized()
      const {
        db: {
          resources: {Sign}
        }
      } = s.app
      const user = await s._fetchAuthorizedUser()
      await Sign.setUserPassword(user, newPassword)
      await s._reloadAuthorized()
      return true
    }
  }
)

module.exports = AccountCtrl
