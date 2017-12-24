/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends SignoutScene */
const SignoutScene = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
)(
  class SignoutSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.signOut
    }

    async doSignout () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await signCtrl.signOut()
      })
    }
  }
)

module.exports = SignoutScene
