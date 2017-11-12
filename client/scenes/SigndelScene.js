/**
 * SigndelScene
 * @class SigndelScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends SigndelScene */
const SigndelScene = cn.compose(
  cn.withEntry,
  cn.withBusy,
  cn.withToggle
)(
  class SigndelSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.auth.signdel
    }

    async doSigndel () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await signCtrl.signdel()
      })
      s.toggle({confirming: false, done: true})
    }
  }
)

module.exports = SigndelScene
