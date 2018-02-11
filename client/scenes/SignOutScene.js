/**
 * SignOutScene
 * @class SignOutScene
 */
'use strict'

const {bindScope, withBack, withBusy} = require('the-scene-mixins/shim')
const Scene = require('./abstract/Scene')

@withBusy
@withBack
@bindScope('sign.out')
class SignOutSceneBase extends Scene {}

/** @lends SignOutScene */
class SignOutScene extends SignOutSceneBase {
  @withBusy.while
  async doExec () {
    const {signCtrl} = this.controllers
    await signCtrl.signOut()
  }
}

module.exports = SignOutScene
