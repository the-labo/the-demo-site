/**
 * VerifySendScene
 * @class VerifySendScene
 */
'use strict'

const {bindScope, withBusy} = require('the-scene-mixins/shim')
const Scene = require('./abstract/Scene')

@withBusy
@bindScope('verify.send')
class VerifySendSceneBase extends Scene {}

/** @lends VerifySendScene */
class VerifySendScene extends VerifySendSceneBase {
  @withBusy.while
  async doExec () {
    const {verifyCtrl} = this.controllers
    const needed = await verifyCtrl.needsVerify()
    if (needed) {
      await verifyCtrl.send()
    }
  }
}

module.exports = VerifySendScene
