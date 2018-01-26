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

  async list ({filter, page, sort,} = {}) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    return userService.pickList({filter, page, sort,})
  }

  async create ({name, profile: profileAttributes, role: roleCode,}) {
    await this._assertAsAdmin()
    const {services: {userService},} = this
    const {user} = await userService.processCreate({name, profileAttributes, roleCode,})
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
