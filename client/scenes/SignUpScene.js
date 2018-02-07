/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const {bindScope, withBack, withBusy, withEntry} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withBack
@bindScope('sign.up')
class SignUpSceneBase extends Scene {}

/** @lends SignUpScene */
class SignUpScene extends SignUpSceneBase {
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

  @withBusy.while
  async doSignUp () {
    const {signCtrl} = this.controllers
    await this.processEntry(({name, password, profile}) => signCtrl.signUp(name, password, {profile}))
  }
}

module.exports = SignUpScene
