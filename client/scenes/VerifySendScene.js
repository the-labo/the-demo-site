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
  cn.withSet,
  cn.withBusy
)(
  class VerifySendSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verify.send
    }

    async doSend () {
      const s = this
      const verifyCtrl = await s.use('verifyCtrl')
      await s.busyFor(async () => {
        const needed = await verifyCtrl.needsVerify()
        if (needed) {
          await verifyCtrl.send()
        }
      })
    }

  }
)

module.exports = VerifySendScene
