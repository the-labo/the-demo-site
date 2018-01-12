/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry, withBack} =  require('the-scene-mixins/shim')

const SignoutSceneBase = compose(
  withBusy,
  withEntry,
  withBack
)(Scene)

/** @lends SignoutScene */
class SignoutScene extends SignoutSceneBase {
  get scope () {
    return this.store.signOut
  }

  async doSignout () {
    const signCtrl = await this.use('signCtrl')
    await this.busyFor(async () => {
      await signCtrl.signOut()
    })
  }
}

module.exports = SignoutScene
