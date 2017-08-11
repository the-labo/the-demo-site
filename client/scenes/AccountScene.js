/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')
const {expand, flatten} = require('objnest')

/** @lends AccountScene */
class AccountScene extends Scene {
  setProfileEntryValues (values) {
    const s = this
    const {store} = s
    const {profile} = store.account
    profile.entry.setValues(values)
  }

  setPasswordEntryValues (values) {
    const s = this
    const {store} = s
    const {password} = store.account
    password.entry.setValues(values)
  }

  async syncProfileEntry () {
    const s = this
    const {store, client} = s
    const {profile} = store.account
    const signCtrl = await client.use('sign')
    profile.busy.true()
    let signed
    try {
      signed = await signCtrl.getSigned()
    } finally {
      profile.busy.false()
    }
    profile.entry.setValues(signed.user.profile || {})
  }

  async doUpdateProfile () {
    const s = this
    const {store, client, l} = s
    const signCtrl = await client.use('sign')
    const {toast} = store
    const {profile} = store.account

    profile.busy.true()
    {
      let done
      try {
        done = await signCtrl.updateProfile(profile.entry.values.state)
      } catch (e) {
        profile.entry.setErrors(s.catchEntryError(e))
      } finally {
        profile.busy.false()
      }
      if (done) {
        toast.info.push(l('toasts.PROFILE_UPDATE_DID_SUCCESS'))
      }
    }
  }

  async doUpdatePassword () {
    const s = this
    const {store, client, l} = s
    const signCtrl = await client.use('sign')
    const {toast} = store
    const {password} = store.account

    password.busy.true()
    {
      let done
      try {
        done = await signCtrl.updatePassword(password.entry.values.state)
      } catch (e) {
        password.entry.setErrors(s.catchEntryError(e))
      } finally {
        password.busy.false()
      }
      if (done) {
        toast.info.push(l('toasts.PASSWORD_UPDATE_DID_SUCCESS'))
      }
    }
  }

  toggleProfileUpdateDone (done) {
    const s = this
    const {store} = s
    const {profile} = store.account
    profile.done.toggle(done)
  }

  togglePasswordUpdateDone (done) {
    const s = this
    const {store} = s
    const {password} = store.account
    password.done.toggle(done)
  }
}

module.exports = AccountScene
