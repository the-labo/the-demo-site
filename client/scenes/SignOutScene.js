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
      return this.store.signOut
    }

    async doSignout () {
      const signCtrl = await this.use('signCtrl')
      await this.busyFor(async () => {
        await signCtrl.signOut()
      })
    }
  }
)

module.exports = SignoutScene
