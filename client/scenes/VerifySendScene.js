/**
 * VerifySendScene
 * @class VerifySendScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const asleep = require('asleep')

/** @lends VerifySendScene */
const VerifySendScene = cn.compose(
  cn.withBusy
)(
  class VerifySendSceneBase extends Scene {
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
)

module.exports = VerifySendScene
