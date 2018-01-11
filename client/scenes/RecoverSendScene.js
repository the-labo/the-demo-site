/**
 * RecoverSendScene
 * @class RecoverSendScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const RecoverSendSceneBase = cn.compose(
  cn.withEntry,
  cn.withBusy,
  cn.withFailure
)(Scene)

/** @lends RecoverSendScene */
class RecoverSendScene extends RecoverSendSceneBase {
  get scope () {
    return this.store.recoverSend
  }

  async doSend () {
    const {l} = this
    const recoverCtrl = await this.use('recoverCtrl')
    await this.busyFor(async () => {
      await this.processEntry(({email}) =>
        recoverCtrl.send(email).catch((e) =>
          this.catchFailure(e, {
            'UnknownEmailError': l('errors.RECOVER_UNKNOWN_EMAIL_ERROR'),
            default: l('errors.RECOVER_SEND_FAILED_ERROR')
          })
        )
      )
    })
  }
}

module.exports = RecoverSendScene
