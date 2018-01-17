/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withEntry, withBusy, withFailure} = require('the-scene-mixins/shim')

@withEntry
@withBusy
@withFailure
@bindScope('recoverReset')
class RecoverResetSceneBase extends Scene {}

/** @lends RecoverResetScene */
class RecoverResetScene extends RecoverResetSceneBase {

  @withBusy.while
  @withFailure.for(({l}) => ({
    ExpiredError: l('errors.RECOVER_EXPIRED_ERROR'),
    default: l('errors.RECOVER_FAILED_ERROR'),
  }))
  async doReset () {
    const {recoverCtrl} = this.controllers
    await this.processEntry(({password, seal, envelop}) =>
      recoverCtrl.reset({password, seal, envelop})
    )
  }
}

module.exports = RecoverResetScene
