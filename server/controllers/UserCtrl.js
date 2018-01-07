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
      const s = this
      await s._assertAsAdmin()
      const {userService} = s.services

      return userService.pickList({filter, sort, page})
    }

    async create ({name, role: roleCode, profile: profileAttributes}) {
      const s = this
      await s._assertAsAdmin()
      const {userService} = s.services

      const {user} = await userService.processCreate({name, roleCode, profileAttributes})
      return user
    }

    async resetPassword (...userIds) {
      const s = this
      await s._assertAsAdmin()
      const {userService} = s.services
      const {newPasswords} = await userService.processReset({userIds})
      return newPasswords
    }

    async destroy (...userIds) {
      const s = this
      await s._assertAsAdmin()
      const {userService} = s.services
      const {destroyed} = await userService.processDestroy({userIds})
      return destroyed.users
    }
  }
)

module.exports = UserCtrl
