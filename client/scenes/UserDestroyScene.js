/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy} =  require('the-scene-mixins/shim')

const UserDestroySceneBase = compose(
  withBusy
)(Scene)

/** @lends UserDestroyScene */
class UserDestroyScene extends UserDestroySceneBase {
  get scope () {
    return this.store.userDestroy
  }

  async doDestroy () {
    const userCtrl = await this.use('userCtrl')
    const userIds = this.get('targets').map(({id}) => id)
    await this.busyFor(async () => {
      await userCtrl.destroy(...userIds)
    })
  }
}

module.exports = UserDestroyScene
