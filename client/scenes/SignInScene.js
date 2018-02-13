/**
 * SignInScene
 * @class SignInScene
 */
'use strict'

const {bindScope, withBack} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@withBack
@bindScope('sign.in')
class SignInSceneBase extends InputScene {}

/** @lends SignInScene */
class SignInScene extends SignInSceneBase {

  async dealWith ({name, password}) {
    const {signCtrl} = this.controllers
    return await signCtrl.signIn(name, password)
  }
}

module.exports = SignInScene
