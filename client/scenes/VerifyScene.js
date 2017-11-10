/**
 * VerifyScene
 * @class VerifyScene
 */
'use strict'

const Scene = require('./Scene')
const asleep = require('asleep')
const {urlUtil} = require('@self/utils')

/** @lends VerifyScene */
class VerifyScene extends Scene {
  get scope () {
    const s = this
    return s.store.auth.verify
  }

  async syncNeedsVerify ({delay = 100} = {}) {
    const s = this
    await asleep(delay)
    const verifyCtrl = await s.use('verifyCtrl')
    const {needsVerify} = s.scope
    const needed = await verifyCtrl.needsVerify()
    needsVerify.toggle(needed)
  }

  async sendVerify () {
    const s = this
    const {busy, needsVerify} = s.scope
    const verifyCtrl = await s.use('verifyCtrl')
    busy.true()
    const needed = await verifyCtrl.needsVerify()
    if (needed) {
      await verifyCtrl.send()
    }
    busy.false()
    needsVerify.false()
  }

  async doVerify () {
    const s = this
    const verifyCtrl = await s.use('verifyCtrl')
    const {seal, envelop} = urlUtil.queryFromSearch()
    const {busy, errorMessage} = s.scope
    busy.true()
    const ok = await verifyCtrl.verify({seal, envelop})
      .catch((e) => {
        switch (e.name) {
          case 'ExpiredError':
            errorMessage.set(l('errors.VERIFY_EXPIRED_ERROR'))
            return null
          default:
            errorMessage.set(l('errors.VERIFY_FAILED_ERROR'))
            return null
        }
      })
    await s.syncNeedsVerify()
    busy.false()
    s.toggleDone(ok)
  }

  toggleDone (flg) {
    const s = this
    const {done} = s.scope
    done.toggle(flg)
  }
}

module.exports = VerifyScene
