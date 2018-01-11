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
      return this.store.verifyNeed
    }

    async doSync ({delay = 100} = {}) {
      await asleep(delay)
      await this.busyFor(async () => {
        const verifyCtrl = await this.use('verifyCtrl')
        const needed = await verifyCtrl.needsVerify()
        this.set({needed})
      })
    }
  }
)

module.exports = VerifyNeedScene
