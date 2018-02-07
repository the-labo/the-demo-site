/**
 * AdminUserDestroyScene
 * @class AdminUserDestroyScene
 */
'use strict'

const {bindScope, withBusy, withTargets} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withTargets
@bindScope('admin.user.destroy')
class AdminUserDestroySceneBase extends Scene {}

/** @lends AdminUserDestroyScene */
class AdminUserDestroyScene extends AdminUserDestroySceneBase {
  @withBusy.while
  async doDestroy () {
    const {adminUserCtrl} = this.controllers
    const userIds = this.getTargetIds()
    await adminUserCtrl.destroy(...userIds)
  }
}

module.exports = AdminUserDestroyScene
