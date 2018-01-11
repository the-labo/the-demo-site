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
      return this.store.userCreate
    }

    async doCreate () {
      const userCtrl = await this.use('userCtrl')
      await this.busyFor(async () => {
        await this.processEntry(async (values) => {
          const created = await userCtrl.create(values)
          this.set({created})
        })
      })
    }

  }
)

module.exports = UserCreateScene
