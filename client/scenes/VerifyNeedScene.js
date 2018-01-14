/**
 * VerifyNeedScene
 * @class VerifyNeedScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy} = require('the-scene-mixins/shim')
const asleep = require('asleep')

@withBusy
@forScope('verifyNeed')
class VerifyNeedSceneBase extends Scene {}

/** @lends VerifyNeedScene */
class VerifyNeedScene extends VerifyNeedSceneBase {
  @withBusy.while
  async doSync ({delay = 100} = {}) {
    await asleep(delay)
    const verifyCtrl = await this.use('verifyCtrl')
    const needed = await verifyCtrl.needsVerify()
    this.set({needed})
  }
}

module.exports = VerifyNeedScene
