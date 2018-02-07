/**
 * AdminUserPasswordScene
 * @class AdminUserPasswordScene
 */
'use strict'

const {bindScope, withBusy, withResult, withTargets} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withResult
@withTargets
@bindScope('admin.user.password')
class AdminUserPasswordSceneBase extends Scene {}

/** @lends AdminUserPasswordScene */
class AdminUserPasswordScene extends AdminUserPasswordSceneBase {
  @withBusy.while
  @withResult.save
  async doReset () {
    const {adminUserCtrl} = this.controllers
    const userIds = this.getTargetIds()
    return await adminUserCtrl.resetPassword(...userIds)
  }
}

module.exports = AdminUserPasswordScene
