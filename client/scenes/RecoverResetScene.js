/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'

const {bindScope, withBusy, withEntry, withFailure,} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withEntry
@withBusy
@withFailure
@bindScope('recover.reset')
class RecoverResetSceneBase extends Scene {}

/** @lends RecoverResetScene */
class RecoverResetScene extends RecoverResetSceneBase {

  @withBusy.while
  @withFailure.for(({l,}) => ({
    ExpiredError: l('errors.RECOVER_EXPIRED_ERROR'),
    default: l('errors.RECOVER_FAILED_ERROR'),
  }))
  async doReset () {
    const {recoverCtrl,} = this.controllers
    await this.processEntry(({envelop, password, seal,}) =>
      recoverCtrl.reset({envelop, password, seal,}))
  }
}

module.exports = RecoverResetScene
