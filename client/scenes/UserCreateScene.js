/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withResult,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withResult
@bindScope('userCreate')
class UserCreateSceneBase extends Scene {}

/** @lends UserCreateScene */
class UserCreateScene extends UserCreateSceneBase {
  @withBusy.while
  @withResult.save
  async doCreate () {
    const {userCtrl} = this.controllers
    return await this.processEntry((values) => userCtrl.create(values))
  }
}

module.exports = UserCreateScene
