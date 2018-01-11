/**
 * UserCtrl
 * @class UserCtrl
 */
'use strict'

const cn = require('./concerns')
const Ctrl = require('./Ctrl')

/** @lends UserCtrl */
const UserCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth,
  cn.withAdmin
)(
  class UserCtrlBase extends Ctrl {
    async list ({filter, sort, page} = {}) {
      await this._assertAsAdmin()
      const {userService} = this.services
      return userService.pickList({filter, sort, page})
    }

    async create ({name, role: roleCode, profile: profileAttributes}) {
      await this._assertAsAdmin()
      const {userService} = this.services
      const {user} = await userService.processCreate({name, roleCode, profileAttributes})
      return user
    }

    async resetPassword (...userIds) {
      await this._assertAsAdmin()
      const {userService} = this.services
      const {newPasswords} = await userService.processReset({userIds})
      return newPasswords
    }

    async destroy (...userIds) {
      await this._assertAsAdmin()
      const {userService} = this.services
      const {destroyed} = await userService.processDestroy({userIds})
      return destroyed.users
    }
  }
)

module.exports = UserCtrl
