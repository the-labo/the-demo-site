/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'


const {bindScope, withFailure} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@withFailure
@bindScope('recover.reset')
class RecoverResetSceneBase extends InputScene {}

/** @lends RecoverResetScene */
class RecoverResetScene extends RecoverResetSceneBase {


  @withFailure.for(({l}) => ({
    ExpiredError: l('errors.RECOVER_EXPIRED_ERROR'),
    default: l('errors.RECOVER_FAILED_ERROR'),
  }))
  async dealWith ({envelop, password, seal}) {
    const {recoverCtrl} = this.controllers
    return recoverCtrl.reset({envelop, password, seal})
  }
}

module.exports = RecoverResetScene
