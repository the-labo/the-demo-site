/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const SignoutSceneBase = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
)(Scene)

/** @lends SignoutScene */
class SignoutScene extends SignoutSceneBase {
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

module.exports = SignoutScene
