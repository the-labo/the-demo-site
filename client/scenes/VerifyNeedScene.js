/**
 * VerifyNeedScene
 * @class VerifyNeedScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const asleep = require('asleep')

/** @lends VerifyNeedScene */
const VerifyNeedScene = cn.compose(
  cn.withBusy
)(
  class VerifyNeedSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verifyNeed
    }

    async doSync ({delay = 100} = {}) {
      const s = this
      await asleep(delay)
      await s.busyFor(async () => {
        const verifyCtrl = await s.use('verifyCtrl')
        const needed = await verifyCtrl.needsVerify()
        s.set({needed})
      })
    }
  }
)

module.exports = VerifyNeedScene
