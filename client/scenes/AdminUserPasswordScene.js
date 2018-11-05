/**
 * AdminUserPasswordScene
 * @class AdminUserPasswordScene
 */
'use strict'

const { bindScope } = require('the-scene-mixins/shim')
const ProcessScene = require('./abstract/ProcessScene')

@bindScope('admin.user.password')
class AdminUserPasswordSceneBase extends ProcessScene {}

/** @lends AdminUserPasswordScene */
class AdminUserPasswordScene extends AdminUserPasswordSceneBase {
  async dealWith (targetIds) {
    const { adminUserCtrl } = this.controllers
    return await adminUserCtrl.resetPassword(...targetIds)
  }
}

module.exports = AdminUserPasswordScene
