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
      const s = this
      return s.store.verifyConfirm
    }

    async doVerify () {
      const s = this
      const {l} = this
      const verifyCtrl = await s.use('verifyCtrl')
      await s.busyFor(async () => {
        await s.processEntry(async ({seal, envelop}) =>
          await verifyCtrl.verify({seal, envelop})
        )
          .catch((e) =>
            s.catchFailure(e, {
              'ExpiredError': l('errors.VERIFY_EXPIRED_ERROR'),
              default: l('errors.VERIFY_FAILED_ERROR')
            })
          )
      })
    }
  }
)

module.exports = VerifyConfirmScene
