/**
 * RecoverSendScene
 * @class RecoverSendScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withEntry, withBusy, withFailure} = require('the-scene-mixins/shim')

@withEntry
@withBusy
@withFailure
@bindScope('recoverSend')
class RecoverSendSceneBase extends Scene {}

/** @lends RecoverSendScene */
class RecoverSendScene extends RecoverSendSceneBase {

  @withBusy.while
  @withFailure.for(({l}) => ({
    UnknownEmailError: l('errors.RECOVER_UNKNOWN_EMAIL_ERROR'),
    default: l('errors.RECOVER_SEND_FAILED_ERROR')
  }))
  async doSend () {
    const {recoverCtrl} = this.controllers
    await this.processEntry(({email}) =>
      recoverCtrl.send(email)
    )
  }
}

module.exports = RecoverSendScene
