/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry, withBack} =  require('the-scene-mixins/shim')

const SignUpSceneBase = compose(
  withBusy,
  withEntry,
  withBack,
)(Scene)

/** @lends SignUpScene */
class SignUpScene extends SignUpSceneBase {
  get scope () {
    return this.store.signUp
  }

  async doSignUp () {
    const signCtrl = await this.use('signCtrl')
    await this.busyFor(async () =>
      await this.processEntry(({name, password, profile}) =>
        signCtrl.signUp(name, password, {profile})
      )
    )
  }

  setStep (step) {
    switch (step) {
      case 1: {
        const values = this.get('entry')
        const email = values['profile.email']
        if (email && !values.name) {
          this.setEntry({name: email.split('@')[0]})
        }
        break
      }
      default:
        break
    }
    this.set({step})
  }
}

module.exports = SignUpScene
