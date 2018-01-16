/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withBack} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withBack
@bindScope('signOut')
class SignoutSceneBase extends Scene {}

/** @lends SignoutScene */
class SignoutScene extends SignoutSceneBase {
  @withBusy.while
  async doSignout () {
    const signCtrl = await this.use('signCtrl')
    await signCtrl.signOut()
  }
}

module.exports = SignoutScene
