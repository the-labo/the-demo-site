/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withBack,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withBack
@bindScope('signIn')
class SignInSceneBase extends Scene {}

/** @lends SignInScene */
class SignInScene extends SignInSceneBase {
  @withBusy.while
  async doSignIn () {
    const signCtrl = await this.use('signCtrl')
    this.processEntry(async ({name, password}) =>
      await signCtrl.signIn(name, password)
    )
  }
}

module.exports = SignInScene
