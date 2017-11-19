/**
 * VerifyVerifyScene
 * @class VerifyVerifyScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends VerifyVerifyScene */
const VerifyVerifyScene = cn.compose(
  cn.withBusy,
  cn.withFailure
)(
  class VerifyVerifySceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verify.verify
    }

    async doVerify () {
      const s = this
      const {l} = this
      const verifyCtrl = await s.use('verifyCtrl')
      await s.busyFor(async () => {
        await verifyCtrl.verify({
          seal: s.get('seal'),
          envelop: s.get('envelop')
        })
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

module.exports = VerifyVerifyScene
