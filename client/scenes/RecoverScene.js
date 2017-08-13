/**
 * RecoverScene
 * @class RecoverScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')
const {urlUtil} = require('@self/utils')

/** @lends RecoverScene */
class RecoverScene extends Scene {
  setSendEntryValues (values) {
    const s = this
    const {store} = s
    const {send} = store.recover
    send.entry.setValues(values)
  }

  setResetEntryValues (values) {
    const s = this
    const {store} = s
    const {reset} = store.recover
    reset.entry.setValues(values)
  }

  async doSend () {
    const s = this
    const {store, client, l} = s
    const recoverCtrl = await client.use('recover')
    const {toast, recover} = store
    const {email} = recover.send.entry.values.state
    recover.send.errorMessage.del()
    {
      recover.send.busy.true()
      let ok
      try {
        await recoverCtrl.send(email)
        ok = true
      } catch (e) {
        switch (e.name) {
          case 'UnknownEmailError':
            recover.send.errorMessage.set(l('errors.RECOVER_UNKNOWN_EMAIL_ERROR'))
            break
          default:
            recover.send.errorMessage.set(l('errors.RECOVER_SEND_FAILED_ERROR'))
            break
        }
      } finally {
        recover.send.busy.false()
      }
      if (ok) {
        toast.info.push(l('toasts.RECOVER_EMAIL_SENT'))
        recover.send.done.true()
      }
    }
  }

  prepareRecoverSend () {
    const s = this
    const {recover} = s.store
    recover.send.done.false()
  }

  prepareRecoverReset () {
    const s = this
    const {recover} = s.store
    recover.reset.done.false()
  }

  async doReset () {
    const s = this
    const {store, client, l} = s
    const recoverCtrl = await client.use('recover')
    const {seal, envelop} = urlUtil.queryFromSearch()
    const {recover, toast} = store
    recover.reset.errorMessage.del()
    const {password} = recover.reset.entry.values.state
    {
      recover.reset.busy.true()
      let ok
      try {
        ok = await recoverCtrl.reset({password, seal, envelop})
      } catch (e) {
        switch (e.name) {
          case 'ExpiredError':
            recover.reset.errorMessage.set(l('errors.RECOVER_EXPIRED_ERROR'))
            break
          default:
            recover.reset.errorMessage.set(l('errors.RECOVER_FAILED_ERROR'))
            break
        }
        console.error(e)
      } finally {
        recover.reset.busy.false()
      }
      if (ok) {
        recover.reset.errorMessage.del()
        recover.reset.done.true()
      }
    }
  }
}

module.exports = RecoverScene
