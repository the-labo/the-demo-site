/**
 * AdminUserPasswordScene
 * @class AdminUserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withResult,} = require('the-scene-mixins/shim')

@withBusy
@withResult
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
