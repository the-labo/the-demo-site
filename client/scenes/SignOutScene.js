/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const {bindScope, withBack, withBusy, withEntry,} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withBack
@bindScope('sign.out')
class SignoutSceneBase extends Scene {}

/** @lends SignoutScene */
class SignoutScene extends SignoutSceneBase {
  @withBusy.while
  async doSignout () {
    const {signCtrl,} = this.controllers
    await signCtrl.signOut()
  }
}

module.exports = SignoutScene
