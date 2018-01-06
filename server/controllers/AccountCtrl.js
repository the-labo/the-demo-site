/**
 * AccountCtrl
 * @class AccountCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')

/** @lends AccountCtrl */
const AccountCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class AccountCtrlBase extends Ctrl {

    async getCurrentUser () {
      const s = this
      const authorized = await s._getAuthorized()
      return authorized ? authorized.user : null
    }

    async updateProfile (profileAttributes) {
      const s = this
      await s._assertAuthorized()
      const {Profile} = s.resources
      const user = await s._fetchAuthorizedUser()
      const profile = await Profile.ofUser(user)
      await user.update({profile})
      await profile.update(profileAttributes)
      await s._reloadAuthorized()
      return true
    }
  }
)

module.exports = AccountCtrl
