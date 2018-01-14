/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@forScope('userDestroy')
class UserDestroySceneBase extends Scene {}

/** @lends UserDestroyScene */
class UserDestroyScene extends UserDestroySceneBase {
  @withBusy.while
  async doDestroy () {
    const userCtrl = await this.use('userCtrl')
    const userIds = this.get('targets').map(({id}) => id)
    await userCtrl.destroy(...userIds)
  }
}

module.exports = UserDestroyScene
