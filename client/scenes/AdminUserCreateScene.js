/**
 * AdminUserCreateScene
 * @class AdminUserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withResult,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withResult
@bindScope('admin.user.create')
class AdminUserCreateSceneBase extends Scene {}

/** @lends AdminUserCreateScene */
class AdminUserCreateScene extends AdminUserCreateSceneBase {
  @withBusy.while
  @withResult.save
  async doCreate () {
    const {adminUserCtrl} = this.controllers
    return await this.processEntry((values) => adminUserCtrl.create(values))
  }
}

module.exports = AdminUserCreateScene
