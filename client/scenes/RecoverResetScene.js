/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withEntry, withBusy, withFailure} = require('the-scene-mixins/shim')

@withEntry
@withBusy
@withFailure
@forScope('recoverReset')
class RecoverResetSceneBase extends Scene {}

/** @lends RecoverResetScene */
class RecoverResetScene extends RecoverResetSceneBase {

  @withBusy.while
  async doReset () {
    const {l} = this
    const recoverCtrl = await this.use('recoverCtrl')
    this.clearFailure()
    await this.processEntry(({password, seal, envelop}) =>
      recoverCtrl.reset({password, seal, envelop}).catch((e) => {
        return this.catchFailure(e, {
          'ExpiredError': l('errors.RECOVER_EXPIRED_ERROR'),
          default: l('errors.RECOVER_FAILED_ERROR')
        })
      })
    )
  }
}

module.exports = RecoverResetScene
