/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const {bindScope, withBack, withBusy, withEntry} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withBack
@bindScope('sign.in')
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
