/**
 * UserCtrl
 * @class UserCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose,} = require('the-controller-mixins')
const {withAdmin} = require('./concerns')

const UserCtrlBase = compose(
  withAdmin,
)(Ctrl)

/** @lends UserCtrl */
class UserCtrl extends UserCtrlBase {

  async list ({filter, sort, page} = {}) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    return userService.pickList({filter, sort, page})
  }

  async create ({name, role: roleCode, profile: profileAttributes}) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    const {user} = await userService.processCreate({name, roleCode, profileAttributes})
    return user
  }

  async resetPassword (...userIds) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    const {newPasswords} = await userService.processReset({userIds})
    return newPasswords
  }

  async destroy (...userIds) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    const {destroyed} = await userService.processDestroy({userIds})
    return destroyed.users
  }

}

module.exports = UserCtrl
