/**
 * AdminUserRoleScene
 * @class AdminUserRoleScene
 */
'use strict'

const {bindScope, withEntry} = require('the-scene-mixins/shim')
const ProcessScene = require('./abstract/ProcessScene')

@withEntry
@bindScope('admin.user.role')
class AdminUserRoleSceneBase extends ProcessScene {}

/** @lends AdminUserRoleScene */
class AdminUserRoleScene extends AdminUserRoleSceneBase {
  async dealWith (targetIds) {
    const {adminUserCtrl} = this.controllers
    return await this.processEntry(async ({role}) => {
      return await adminUserCtrl.updateRole(role, ...targetIds)
    })
  }
}

module.exports = AdminUserRoleScene
