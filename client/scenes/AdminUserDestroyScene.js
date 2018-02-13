/**
 * AdminUserDestroyScene
 * @class AdminUserDestroyScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const ProcessScene = require('./abstract/ProcessScene')

@bindScope('admin.user.destroy')
class AdminUserDestroySceneBase extends ProcessScene {}

/** @lends AdminUserDestroyScene */
class AdminUserDestroyScene extends AdminUserDestroySceneBase {

  async dealWith (targetIds) {
    const {adminUserCtrl} = this.controllers
    return await adminUserCtrl.destroy(...targetIds)
  }
}

module.exports = AdminUserDestroyScene
