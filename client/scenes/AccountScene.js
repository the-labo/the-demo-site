/**
 * AuthScene
 * @class AuthScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')
const {clone} = require('asobj')

/** @lends AuthScene */
class AuthScene extends Scene {
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
    const authCtrl = await s.use('sign')

    profile.busy.true()
    let signed
    try {
      signed = await authCtrl.getSigned()
    } finally {
      profile.busy.false()
    }
    const values = clone(signed.user.profile || {}, {
      without: ['user', 'id', 'sign', /^\$/]
    })
    profile.entry.setValues(values)
  }

  async doUpdateProfile () {
    const s = this
    const {store, client, l} = s
    const authCtrl = await s.use('sign')
    const {toast} = store
    const {profile} = store.account

    profile.busy.true()
    {
      let done
      try {
        done = await authCtrl.updateProfile(profile.entry.values.state)
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
    const authCtrl = await s.use('sign')
    const {toast} = store
    const {password} = store.account

    password.busy.true()
    {
      let done
      try {
        done = await authCtrl.updatePassword(password.entry.values.state)
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

module.exports = AuthScene
