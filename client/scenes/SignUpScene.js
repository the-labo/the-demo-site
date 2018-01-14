/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy, withEntry, withBack} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withBack
@forScope('signUp')
class SignUpSceneBase extends Scene {}

/** @lends SignUpScene */
class SignUpScene extends SignUpSceneBase {
  @withBusy.while
  async doSignUp () {
    const signCtrl = await this.use('signCtrl')
    await this.processEntry(({name, password, profile}) =>
      signCtrl.signUp(name, password, {profile})
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
