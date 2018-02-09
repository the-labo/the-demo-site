/**
 * AccountCtrl
 * @class AccountCtrl
 */
'use strict'

const {compose} = require('the-controller-mixins')
const Local = require('@self/Local')
const Ctrl = require('./Ctrl')
const AccountCtrlBase = compose(

)(Ctrl)

/** @lends AccountCtrl */
class AccountCtrl extends AccountCtrlBase {
  async getCurrentUser () {
    await this.syncUser()
    return this.user
  }

  async updatePassword (newPassword) {
    await this._assertAuthorized()
    const {
      services: {accountService},
      user: {id: userId},
    } = this
    await accountService.processPassword({newPassword, userId})
    await this._reloadAuthorized()
    return true
  }

  async updateProfile (profileAttributes) {
    await this._assertAuthorized()
    const {
      services: {accountService},
      user: {id: userId},
    } = this
    await accountService.processProfile({
      profileAttributes, publicDir: Local.PUBLIC_DIR, userId,
    })
    await this._reloadAuthorized()
    return true
  }

}

module.exports = AccountCtrl
