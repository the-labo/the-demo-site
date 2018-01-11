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
      const user = await this._fetchAuthorizedUser()
      return user || null
    }

    async updateProfile (profileAttributes) {
      const {accountService} = this.services
      await this._assertAuthorized()
      const {id: userId} = await this._fetchAuthorizedUser()
      await accountService.processProfile({userId, profileAttributes})
      await this._reloadAuthorized()
      return true
    }

    async updatePassword (newPassword) {
      const {accountService} = this.services
      await this._assertAuthorized()
      const {id: userId} = await this._fetchAuthorizedUser()
      await accountService.processPassword({userId, newPassword})
      await this._reloadAuthorized()
      return true
    }

  }
)

module.exports = AccountCtrl
