/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const UserCreateSceneBase = cn.compose(
  cn.withBusy,
  cn.withEntry
)(Scene)

/** @lends UserCreateScene */
class UserCreateScene extends UserCreateSceneBase {
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

module.exports = UserCreateScene
