/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBack, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withBack
@bindScope('signIn')
class SignInSceneBase extends Scene {}

/** @lends SignInScene */
class SignInScene extends SignInSceneBase {
  @withBusy.while
  async doSignIn () {
    const {signCtrl} = this.controllers
    await this.processEntry(({name, password}) => signCtrl.signIn(name, password))
  }
}

module.exports = SignInScene
