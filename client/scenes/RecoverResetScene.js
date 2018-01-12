/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withEntry, withBusy, withFailure} =  require('the-scene-mixins/shim')

const RecoverResetSceneBase = compose(
  withEntry,
  withBusy,
  withFailure
)(Scene)

/** @lends RecoverResetScene */
class RecoverResetScene extends RecoverResetSceneBase {
  get scope () {
    return this.store.recoverReset
  }

  async doReset () {
    const {l} = this
    const recoverCtrl = await this.use('recoverCtrl')
    this.clearFailure()
    await this.busyFor(async () => {
      await this.processEntry(({password, seal, envelop}) =>
        recoverCtrl.reset({password, seal, envelop}).catch((e) => {
          return this.catchFailure(e, {
            'ExpiredError': l('errors.RECOVER_EXPIRED_ERROR'),
            default: l('errors.RECOVER_FAILED_ERROR')
          })
        })
      )
    })
  }
}

module.exports = RecoverResetScene
