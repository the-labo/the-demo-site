/**
 * SignOutScene
 * @class SignOutScene
 */
'use strict'

const {bindScope, withBack, withBusy} = require('the-scene-mixins/shim')
const CallScene = require('./abstract/CallScene')

@withBack
@bindScope('sign.out')
class SignOutSceneBase extends CallScene {}

/** @lends SignOutScene */
class SignOutScene extends SignOutSceneBase {
  async dealWith () {
    const {signCtrl} = this.controllers
    return await signCtrl.signOut()
  }
}

module.exports = SignOutScene
