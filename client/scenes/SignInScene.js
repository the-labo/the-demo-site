/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const SignInSceneBase = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
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
