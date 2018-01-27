/**
 * AdminUserDestroyScene
 * @class AdminUserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withTargets,} = require('the-scene-mixins/shim')

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
