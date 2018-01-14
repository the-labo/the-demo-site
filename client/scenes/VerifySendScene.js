/**
 * VerifySendScene
 * @class VerifySendScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@forScope('verifySend')
class VerifySendSceneBase extends Scene {}

/** @lends VerifySendScene */
class VerifySendScene extends VerifySendSceneBase {
  @withBusy.while
  async doSend () {
    const verifyCtrl = await this.use('verifyCtrl')
    const needed = await verifyCtrl.needsVerify()
    if (needed) {
      await verifyCtrl.send()
    }
  }
}

module.exports = VerifySendScene
