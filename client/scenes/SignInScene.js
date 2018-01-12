/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry, withBack,} =  require('the-scene-mixins/shim')

const SignInSceneBase = compose(
  withBusy,
  withEntry,
  withBack,
)(Scene)

/** @lends SignInScene */
class SignInScene extends SignInSceneBase {
  get scope () {
    return this.store.signIn
  }

  async doSignIn () {
    const signCtrl = await this.use('signCtrl')
    await this.busyFor(async () =>
      this.processEntry(async ({name, password}) =>
        await signCtrl.signIn(name, password)
      )
    )
  }
}

module.exports = SignInScene
