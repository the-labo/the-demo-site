/**
 * UserPasswordScene
 * @class UserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@bindScope('userPassword')
class UserPasswordSceneBase extends Scene {}

/** @lends UserPasswordScene */
class UserPasswordScene extends UserPasswordSceneBase {
  @withBusy.while
  async doReset () {
    const {userCtrl} = this.controllers
    const userIds = this.get('targets').map(({id}) => String(id))
    const newPasswords = await userCtrl.resetPassword(...userIds)
    this.set({results: newPasswords})
  }
}

module.exports = UserPasswordScene
