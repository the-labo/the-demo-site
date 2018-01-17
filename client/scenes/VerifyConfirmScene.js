/**
 * VerifyConfirmScene
 * @class VerifyConfirmScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withFailure,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withFailure
@bindScope('verifyConfirm')
class VerifyConfirmSceneBase extends Scene {}

/** @lends VerifyConfirmScene */
class VerifyConfirmScene extends VerifyConfirmSceneBase {
  @withBusy.while
  @withFailure.for(({l}) => ({
    ExpiredError: l('errors.VERIFY_EXPIRED_ERROR'),
    default: l('errors.VERIFY_FAILED_ERROR')
  }))
  async doVerify () {
    const {verifyCtrl} = this.controllers
    await this.processEntry(async ({seal, envelop}) =>
      await verifyCtrl.verify({seal, envelop})
    )
  }
}

module.exports = VerifyConfirmScene
