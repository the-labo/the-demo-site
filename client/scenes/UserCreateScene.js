/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@bindScope('userCreate')
class UserCreateSceneBase extends Scene {}

/** @lends UserCreateScene */
class UserCreateScene extends UserCreateSceneBase {
  @withBusy.while
  async doCreate () {
    const userCtrl = await this.use('userCtrl')
    await this.processEntry(async (values) => {
      const created = await userCtrl.create(values)
      this.set({created})
    })
  }
}

module.exports = UserCreateScene
