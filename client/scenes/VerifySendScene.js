/**
 * VerifySendScene
 * @class VerifySendScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

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

    async doSync ({delay = 100} = {}) {
      const s = this
      await asleep(delay)
      const verifyCtrl = await s.use('verifyCtrl')
      const needsVerify = await verifyCtrl.needsVerify()
      s.toggle({needsVerify})
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
      s.toggle({needsVerify: false})
    }

  }
)

module.exports = VerifySendScene
