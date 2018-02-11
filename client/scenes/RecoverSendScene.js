/**
 * RecoverSendScene
 * @class RecoverSendScene
 */
'use strict'


const {bindScope, withFailure} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@withFailure
@bindScope('recover.send')
class RecoverSendSceneBase extends InputScene {}

/** @lends RecoverSendScene */
class RecoverSendScene extends RecoverSendSceneBase {


  @withFailure.for(({l}) => ({
    UnknownEmailError: l('errors.RECOVER_UNKNOWN_EMAIL_ERROR'),
    default: l('errors.RECOVER_SEND_FAILED_ERROR'),
  }))
  async dealWith ({email}) {
    const {recoverCtrl} = this.controllers
    return await recoverCtrl.send(email)
  }
}

module.exports = RecoverSendScene
