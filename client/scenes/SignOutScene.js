/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBack, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withBack
@bindScope('signOut')
class SignoutSceneBase extends Scene {}

/** @lends SignoutScene */
class SignoutScene extends SignoutSceneBase {
  @withBusy.while
  async doSignout () {
    const {signCtrl} = this.controllers
    await signCtrl.signOut()
  }
}

module.exports = SignoutScene
