/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends SignInScene */
const SignInScene = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
)(
  class SignInSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store['signIn']
    }

    async doSignIn () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({name, password}) => signCtrl.signIn(name, password))
      })
    }
  }
)

module.exports = SignInScene
