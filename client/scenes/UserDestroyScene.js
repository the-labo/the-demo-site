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
      const s = this
      return s.store.userDestroy
    }

    async doDestroy () {
      const s = this
      const userCtrl = await s.use('userCtrl')
      const userIds = s.get('targets').map(({id}) => id)
      await s.busyFor(async () => {
        await userCtrl.destroy(...userIds)
      })

    }
  }
)

module.exports = UserDestroyScene
