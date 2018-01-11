/**
 * VerifyConfirmScene
 * @class VerifyConfirmScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends VerifyConfirmScene */
const VerifyConfirmScene = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withFailure
)(
  class VerifyConfirmSceneBase extends Scene {
    get scope () {
      return this.store.verifyConfirm
    }

    async doVerify () {
      const {l} = this
      const verifyCtrl = await this.use('verifyCtrl')
      await this.busyFor(async () => {
        await this.processEntry(async ({seal, envelop}) =>
          await verifyCtrl.verify({seal, envelop}).catch((e) =>
            this.catchFailure(e, {
              'ExpiredError': l('errors.VERIFY_EXPIRED_ERROR'),
              default: l('errors.VERIFY_FAILED_ERROR')
            })
          )
        )
      })
    }
  }
)

module.exports = VerifyConfirmScene
