/**
 * SigninScene
 * @class SigninScene
 */
'use strict'

const Scene = require('./Scene')
const {withEntry, withBusy} = require('./concerns')

/** @lends SigninScene */
const SigninScene = withBusy(withEntry(
  class SigninSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.sign.signin
    }

    async doSignin () {
      const s = this
      const authCtrl = await s.use('authCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({name, password}) => authCtrl.signin(name, password))
      })
    }
  }
))

module.exports = SigninScene
