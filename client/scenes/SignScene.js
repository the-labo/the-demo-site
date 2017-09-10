/**
 * SignScene
 * @class SignScene
 */
'use strict'

const Scene = require('./Scene')
const {unlessProduction} = require('the-check')
const {Urls} = require('@self/conf')
const {expand} = require('objnest')

const debug = require('debug')('app:ui:sign')

/** @lends SignScene */
class SignScene extends Scene {
  /**
   * Set entry values for signup
   * @param values
   * @returns {Promise.<void>}
   */
  async setSignupValues (values) {
    const s = this
    const {store} = s
    const {signup} = store.sign
    signup.entry.setValues(values)
  }

  /**
   * Set entry values for signup
   * @param values
   * @returns {Promise.<void>}
   */
  async setSigninValues (values) {
    const s = this
    const {store} = s
    const {signin} = store.sign
    signin.entry.setValues(values)
  }

  /**
   * Clear signup values
   * @returns {Promise.<void>}
   */
  async dropSignupValues () {
    const s = this
    const {store} = s
    const {signup} = store.sign
    signup.entry.drop()
  }

  /**
   * Clear signin values
   * @returns {Promise.<void>}
   */
  async dropSigninValues () {
    const s = this
    const {store} = s
    const {signin} = store.sign
    signin.entry.drop()
  }

  async doSignup () {
    const s = this
    const {client, store, l} = s

    const {signup, signed} = store.sign
    const signCtrl = await client.use('sign')
    const {name, password, profile} = expand(signup.entry.values.state)

    {
      let user
      signup.busy.true()
      try {
        user = await signCtrl.signup(name, password, {profile})
        debug('signup and signin as', user)
      } catch (e) {
        signup.entry.setErrors(s.catchEntryError(e))
      } finally {
        signup.busy.false()
      }
      if (user) {
        signed.user.set(user)
        s.pushInfoToast(l('toasts.SIGNUP_DID_SUCCESS'))
      }
    }
  }

  /**
   * Do signin
   * @returns {Promise.<void>}
   */
  async doSignin () {
    const s = this
    const {client, store, l} = s

    const {signin, signed} = store.sign
    const signCtrl = await client.use('sign')
    let {name, password} = expand(signin.entry.values.state)

    {
      let user
      signin.busy.true()
      try {
        user = await signCtrl.signin(name, password)
      } catch (e) {
        signin.entry.setErrors(s.catchEntryError(e))
      } finally {
        signin.busy.false()
      }
      if (user) {
        debug('signin as', user)
        signed.user.set(user)
        s.pushInfoToast(l('toasts.SIGNIN_DID_SUCCESS'))
        await s.dropSigninValues()
      }
    }
  }

  /**
   * Do signout
   * @returns {Promise.<void>}
   */
  async doSignout () {
    const s = this
    const {client, store, l} = s

    const {signout, signed} = store.sign
    const signCtrl = await client.use('sign')

    signout.busy.true()
    try {
      await signCtrl.signout()
      signed.user.del()
    } finally {
      signout.busy.false()
    }
    s.pushInfoToast(l('toasts.SIGNOUT_DID_SUCCESS'))
    await s.dropSignupValues()
    await s.dropSigninValues()
  }

  /**
   * Sync signed user data from server
   * @returns {Promise.<void>}
   */
  async syncSigned () {
    const s = this
    const {client, store} = s
    const {signed} = store.sign
    const signCtrl = await client.use('sign')
    signed.busy.true()
    const {user} = (await signCtrl.getSigned()) || {}
    signed.busy.false()
    if (user) {
      signed.user.set(user)
      unlessProduction(() => {
        const {id, name, profile} = user
        console.log(`[SignScene] Signed as: "${name}"`, {id, name, profile})
      })
    } else {
      signed.user.del()
    }
    signed.synced.true()
    return user
  }

  async finishSignin () {
    const s = this
    const {back} = s.store.sign
    const url = back.state || Urls.TOP_URL
    back.del()
    s.goTo(url)
  }

  async finishSignup () {
    const s = this
    const {back} = s.store.sign
    const url = back.state || Urls.TOP_URL
    back.del()
    s.goTo(url)
  }

  async finishSignout () {
    const s = this
    s.goTo(Urls.TOP_URL)
  }

  async goToSignin () {
    const s = this
    s.goTo(Urls.SIGNIN_URL)
  }

  async abortSigndel () {
    const s = this
    s.goTo(Urls.TOP_URL)
  }

  toggleSigndelConfirming (confirming) {
    const s = this
    const {store} = s
    const {signdel} = store.sign
    signdel.confirming.toggle(confirming)
  }

  toggleSigndelDone (done) {
    const s = this
    const {store} = s
    const {signdel} = store.sign
    signdel.done.toggle(done)
  }

  async doSigndel () {
    const s = this
    const {store, client} = s
    const {signed, signdel} = store.sign
    const signCtrl = await client.use('sign')
    signdel.busy.true()
    let done
    try {
      done = await signCtrl.signdel()
    } finally {
      signdel.busy.false()
    }
    if (done) {
      signed.user.del()
      signdel.confirming.false()
      signdel.done.true()
    }
  }
}

module.exports = SignScene
