/**
 * VerifyConfirmScene
 * @class VerifyConfirmScene
 */
'use strict'

const {bindScope, withBusy, withEntry, withFailure,} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withFailure
@bindScope('verify.confirm')
class VerifyConfirmSceneBase extends Scene {}

/** @lends VerifyConfirmScene */
class VerifyConfirmScene extends VerifyConfirmSceneBase {
  @withBusy.while
  @withFailure.for(({l,}) => ({
    ExpiredError: l('errors.VERIFY_EXPIRED_ERROR'),
    default: l('errors.VERIFY_FAILED_ERROR'),
  }))
  async doVerify () {
    const {verifyCtrl,} = this.controllers
    await this.processEntry(({envelop, seal,}) => verifyCtrl.verify({envelop, seal,}))
  }
}

module.exports = VerifyConfirmScene
