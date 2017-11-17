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
  cn.withSet,
  cn.withFailure
)(
  class VerifyVerifySceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verify.verify
    }

    async doVerify () {
      const s = this
      const verifyCtrl = await s.use('verifyCtrl')
      const {seal, envelop} = s.queryFromSearch()
      await s.busyFor(async () => {
        await verifyCtrl.verify({seal, envelop})
          .catch((e) =>
            s.catchFailure(e, {
              'ExpiredError': l('errors.VERIFY_EXPIRED_ERROR'),
              default: l('errors.VERIFY_FAILED_ERROR')
            })
          )
        await s.syncNeedsVerify()
      })
      s.toggle({done: true})
    }
  }
)

module.exports = VerifyVerifyScene
