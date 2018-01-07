/**
 * AccountCtrl
 * @class AccountCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheAccountService} = require('the-site-services')

/** @lends AccountCtrl */
const AccountCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class AccountCtrlBase extends Ctrl {

    async getCurrentUser () {
      const s = this
      const user = await s._fetchAuthorizedUser()
      return user || null
    }

    async updateProfile (profileAttributes) {
      const s = this
      const {accountService} = s.services
      await s._assertAuthorized()
      const {id: userId} = await s._fetchAuthorizedUser()
      await accountService.processProfile({userId, profileAttributes})
      await s._reloadAuthorized()
      return true
    }

    async updatePassword (newPassword) {
      const s = this
      const {accountService} = s.services
      await s._assertAuthorized()
      const {id: userId} = await s._fetchAuthorizedUser()
      await accountService.processPassword({userId, newPassword})
      await s._reloadAuthorized()
      return true
    }

    get services () {
      const s = this
      return {
        accountService: new TheAccountService(s.resources)
      }
    }
  }
)

module.exports = AccountCtrl
