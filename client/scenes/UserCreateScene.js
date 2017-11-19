/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserCreateScene */
const UserCreateScene = cn.compose(
  cn.withBusy,
  cn.withEntry
)(
  class UserCreateSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.user.create
    }

    async doCreate () {
      const s = this
      const userCtrl = await s.use('userCtrl')
      await s.busyFor(async () => {
        await s.processEntry((values) => userCtrl.create(values))
      })
    }

  }
)

module.exports = UserCreateScene
