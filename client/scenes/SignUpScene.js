/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const {bindScope, withBack} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@withBack
@bindScope('sign.up')
class SignUpSceneBase extends InputScene {}

/** @lends SignUpScene */
class SignUpScene extends SignUpSceneBase {
  setStep (step) {
    switch (step) {
      case 1: {
        const values = this.get('entry')
        const email = values['profile.email']
        if (email && !values.name) {
          const name = email.split('@')[0].replace(/\./g, '')
          this.setEntry({name: name})
        }
        break
      }
      default:
        break
    }
    this.set({step})
  }

  async dealWith ({name, password, profile}) {
    const {signCtrl} = this.controllers
    await signCtrl.signUp(name, password, {profile})
  }
}

module.exports = SignUpScene
