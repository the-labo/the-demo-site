/**
 * SignupScene
 * @class SignupScene
 */
'use strict'

const Scene = require('./Scene')
const {withEntry, withBusy} = require('./concerns')

/** @lends SignupScene */
const SignupScene = withBusy(withEntry(
  class SignupSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.sign.signup
    }

    async doSignup () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({name, password, profile}) =>
          signCtrl.signup(name, password)
        )
      })
    }
  }
))

module.exports = SignupScene
