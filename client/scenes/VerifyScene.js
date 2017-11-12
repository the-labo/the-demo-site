/**
 * VerifyScene
 * @class VerifyScene
 */
'use strict'

const Scene = require('./Scene')
const asleep = require('asleep')
const cn = require('./concerns')

/** @lends VerifyScene */
const VerifyScene = cn.compose(
  cn.withSet,
  cn.withToggle,
  cn.withEntry,
  cn.withFailure
)(
  class VerifyScene extends Scene {
    get scope () {
      const s = this
      return s.store.verify
    }

    async syncNeedsVerify ({delay = 100} = {}) {
      const s = this
      await asleep(delay)
      const verifyCtrl = await s.use('verifyCtrl')
      const needsVerify = await verifyCtrl.needsVerify()
      s.toggle({needsVerify})
    }

    async sendVerify () {
      const s = this
      const verifyCtrl = await s.use('verifyCtrl')
      await s.busyFor(async () => {
        const needed = await verifyCtrl.needsVerify()
        if (needed) {
          await verifyCtrl.send()
        }
      })
      s.toggle({needsVerify: false})
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

module.exports = VerifyScene
