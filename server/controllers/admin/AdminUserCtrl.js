/**
 * AdminUserCtrl
 * @class AdminUserCtrl
 */
'use strict'

const { compose } = require('the-controller-mixins')
const { withAdmin } = require('../concerns')
const Ctrl = require('../Ctrl')

const AdminUserCtrlBase = compose(
  withAdmin,
)(Ctrl)

/** @lends AdminUserCtrl */
class AdminUserCtrl extends AdminUserCtrlBase {
  async create ({ name, profile: profileAttributes, role: roleCode }) {
    const { services: { userService } } = this
    const { user } = await userService.processCreate({ name, profileAttributes, roleCode })
    return user
  }

  async destroy (...userIds) {
    const { services: { userService } } = this
    const { destroyed } = await userService.processDestroy({ userIds })
    return destroyed.users
  }

  async list ({ filter, page, sort } = {}) {
    const { services: { userService } } = this
    return userService.pickList({ filter, page, sort })
  }

  async resetPassword (...userIds) {
    const { services: { userService } } = this
    const { newPasswords } = await userService.processReset({ userIds })
    return newPasswords
  }

  async updateRole (roleCode, ...userIds) {
    const { services: { userService } } = this
    const { newRoles } = await userService.processRole({ roleCode, userIds })
    return newRoles
  }
}

module.exports = AdminUserCtrl
