/**
 * AccountCtrl
 * @class AccountCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose,} = require('the-controller-mixins')
const Local = require('@self/Local')
const AccountCtrlBase = compose(

)(Ctrl)

/** @lends AccountCtrl */
class AccountCtrl extends AccountCtrlBase {
  async getCurrentUser () {
    await this.syncUser()
    return this.user
  }

  async updateProfile (profileAttributes) {
    await this._assertAuthorized()
    const {
      user: {id: userId,},
      services: {accountService}
    } = this
    await accountService.processProfile({
      userId, profileAttributes, publicDir: Local.PUBLIC_DIR
    })
    await this._reloadAuthorized()
    return true
  }

  async updatePassword (newPassword) {
    await this._assertAuthorized()
    const {
      user: {id: userId},
      services: {accountService}
    } = this
    await accountService.processPassword({userId, newPassword})
    await this._reloadAuthorized()
    return true
  }

}

module.exports = AccountCtrl
