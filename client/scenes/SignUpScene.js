/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends SignUpScene */
const SignUpScene = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
)(
  class SignUpSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store['signUp']
    }

    async doSignUp () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({name, password, profile}) =>
          signCtrl.signUp(name, password)
        )
      })
    }
  }
)

module.exports = SignUpScene
