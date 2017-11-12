/**
 * SigninScene
 * @class SigninScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends SigninScene */
const SigninScene = cn.compose(
  cn.withBusy,
  cn.withEntry
)(
  class SigninSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.sign.signin
    }

    async doSignin () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({name, password}) => signCtrl.signin(name, password))
      })
    }
  }
)

module.exports = SigninScene
