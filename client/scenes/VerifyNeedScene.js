/**
 * VerifyNeedScene
 * @class VerifyNeedScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy} =  require('the-scene-mixins/shim')
const asleep = require('asleep')

const VerifyNeedSceneBase = compose(
  withBusy,
)(Scene)

/** @lends VerifyNeedScene */
class VerifyNeedScene extends VerifyNeedSceneBase {
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

module.exports = VerifyNeedScene
