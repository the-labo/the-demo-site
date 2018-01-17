/**
 * VerifyNeedScene
 * @class VerifyNeedScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy} = require('the-scene-mixins/shim')
const asleep = require('asleep')

@withBusy
@bindScope('verifyNeed')
class VerifyNeedSceneBase extends Scene {}

/** @lends VerifyNeedScene */
class VerifyNeedScene extends VerifyNeedSceneBase {
  @withBusy.while
  async doSync ({delay = 100} = {}) {
    await asleep(delay)
    const {verifyCtrl} = this.controllers
    const needed = await verifyCtrl.needsVerify()
    this.set({needed})
  }
}

module.exports = VerifyNeedScene
