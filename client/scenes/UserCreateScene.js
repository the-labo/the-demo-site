/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry} =  require('the-scene-mixins/shim')

const UserCreateSceneBase = compose(
  withBusy,
  withEntry,
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
