/**
 * UserPasswordScene
 * @class UserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@forScope('userPassword')
class UserPasswordSceneBase extends Scene {}

/** @lends UserPasswordScene */
class UserPasswordScene extends UserPasswordSceneBase {
  @withBusy.while
  async doReset () {
    const userCtrl = await this.use('userCtrl')
    const userIds = this.get('targets').map(({id}) => String(id))
    const newPasswords = await userCtrl.resetPassword(...userIds)
    this.set({results: newPasswords})
  }
}

module.exports = UserPasswordScene
