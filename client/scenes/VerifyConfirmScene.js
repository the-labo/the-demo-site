/**
 * VerifyConfirmScene
 * @class VerifyConfirmScene
 */
'use strict'


const {bindScope, withFailure} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@withFailure
@bindScope('verify.confirm')
class VerifyConfirmSceneBase extends InputScene {}

/** @lends VerifyConfirmScene */
class VerifyConfirmScene extends VerifyConfirmSceneBase {

  @withFailure.for(({l}) => ({
    ExpiredError: l('errors.VERIFY_EXPIRED_ERROR'),
    default: l('errors.VERIFY_FAILED_ERROR'),
  }))
  async dealWith ({envelop, seal}) {
    const {verifyCtrl} = this.controllers
    return await verifyCtrl.verify({envelop, seal})
  }
}

module.exports = VerifyConfirmScene
