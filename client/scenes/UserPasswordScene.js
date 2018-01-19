/**
 * UserPasswordScene
 * @class UserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withResult,} = require('the-scene-mixins/shim')

@withBusy
@withResult
@bindScope('userPassword')
class UserPasswordSceneBase extends Scene {}

/** @lends UserPasswordScene */
class UserPasswordScene extends UserPasswordSceneBase {
  @withBusy.while
  @withResult.save
  async doReset () {
    const {userCtrl} = this.controllers
    const userIds = this.getTargetIds()
    return await userCtrl.resetPassword(...userIds)
  }
}

module.exports = UserPasswordScene
