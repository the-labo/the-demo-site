/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserDestroyScene */
const UserDestroyScene = cn.compose(
  cn.withBusy
)(
  class UserDestroySceneBase extends Scene {
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
)

module.exports = UserDestroyScene
