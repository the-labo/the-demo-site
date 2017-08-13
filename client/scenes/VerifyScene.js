/**
 * VerifyScene
 * @class VerifyScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')
const {urlUtil} = require('@self/utils')

/** @lends VerifyScene */
class VerifyScene extends Scene {
  async syncNeedsVerify () {
    const s = this
    const {store, client, l} = s
    const {toast, verify} = store
    const verifyCtrl = await client.use('verify')
    const needsVerify = await verifyCtrl.needsVerify()
    store.verify.needsVerify.toggle(needsVerify)
  }

  async sendVerify () {
    const s = this
    const {store, client, l} = s
    const {toast, verify} = store
    const verifyCtrl = await client.use('verify')
    verify.busy.true()
    let ok
    try {
      const needsVerify = await verifyCtrl.needsVerify()
      if (needsVerify) {
        await verifyCtrl.send()
      }
      ok = true
    } catch (e) {
      toast.error.push(l('errors.VERIFY_SEND_FAILED_ERROR'))
      console.error(e)
    } finally {
      verify.busy.false()
    }
    if (ok) {
      toast.info.push(l('toasts.VERIFY_EMAIL_SENT'))
      verify.needsVerify.false()
    }
  }

  async doVerify () {
    const s = this
    const {store, client, l} = s
    const verifyCtrl = await client.use('verify')
    const {seal, envelop} = urlUtil.queryFromSearch()
    const {verify} = store.account
    verify.busy.true()
    try {
      const ok = await verifyCtrl.verify({seal, envelop})
    } catch (e) {
      switch (e.name) {
        case 'ExpiredError':
          verify.error.set(l('errors.VERIFY_EXPIRED_ERROR'))
          break
        default:
          verify.error.set(l('errors.VERIFY_FAILED_ERROR'))
          break
      }
      console.error(e)
    } finally {
      verify.busy.false()
    }
  }
}

module.exports = VerifyScene
