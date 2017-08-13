/**
 * RecoverScene
 * @class RecoverScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')

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
    const {email} = send.entry.values.state
    recover.send.busy.true()
    try {
      await recoverCtrl.send(email)
    } catch (e) {
      toast.error.push(l('toasts.RECOVER_EMAIL_SENT'))
    } finally {
      recover.send.busy.false()
    }

  }

  async doReset () {
    const s = this
    const {store, client} = s
    const recoverCtrl = await client.use('recover')
    const {reset} = store.recover
  }
}

module.exports = RecoverScene
