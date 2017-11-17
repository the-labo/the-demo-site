/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserDestroyScene */
const UserDestroyScene = cn.compose(
  cn.withBusy,
  cn.withSet,
)(
  class UserDestroySceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.user.destroy
    }

    prepare (targets) {
      const s = this
      s.set({
        active: true,
        done: false,
        targets
      })
    }

    clear () {
      const s = this
      s.set({
        active: false,
        done: false,
        targets: []
      })
    }

    async doDestroy () {
      const s = this
      const userCtrl = await s.use('userCtrl')
      const userIds = s.scope.targets.map(({id}) => id)
      await s.busyFor(async () => {
        await userCtrl.destroy(...userIds)
      })

    }
  }
)

module.exports = UserDestroyScene
