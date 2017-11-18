/**
 * VerifyScene
 * @class VerifyScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const asleep = require('asleep')

/** @lends VerifyScene */
const VerifyScene = cn.compose(
  cn.withSet
)(
  class VerifySceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verify
    }

    async doSync ({delay = 100} = {}) {
      const s = this
      await asleep(delay)
      const verifyCtrl = await s.use('verifyCtrl')
      const needsVerify = await verifyCtrl.needsVerify()
      s.set({needsVerify})
    }
  }
)

module.exports = VerifyScene
