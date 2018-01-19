/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withTargets,} = require('the-scene-mixins/shim')

@withBusy
@withTargets
@bindScope('userDestroy')
class UserDestroySceneBase extends Scene {}

/** @lends UserDestroyScene */
class UserDestroyScene extends UserDestroySceneBase {
  @withBusy.while
  async doDestroy () {
    const {userCtrl} = this.controllers
    const userIds = this.getTargetIds()
    await userCtrl.destroy(...userIds)
  }
}

module.exports = UserDestroyScene
