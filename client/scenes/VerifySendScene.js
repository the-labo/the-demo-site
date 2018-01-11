/**
 * VerifySendScene
 * @class VerifySendScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const VerifySendSceneBase = cn.compose(
  cn.withBusy
)(Scene)

/** @lends VerifySendScene */
class VerifySendScene extends VerifySendSceneBase {
  get scope () {
    return this.store.verifySend
  }

  async doSend () {
    const verifyCtrl = await this.use('verifyCtrl')
    await this.busyFor(async () => {
      const needed = await verifyCtrl.needsVerify()
      if (needed) {
        await verifyCtrl.send()
      }
    })
  }
}

module.exports = VerifySendScene
