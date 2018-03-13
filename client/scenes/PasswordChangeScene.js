/**
 * PasswordChangeScene
 * @class PasswordChangeScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@bindScope('password.change')
class PasswordChangeSceneBase extends InputScene {}

/** @lends PasswordChangeScene */
class PasswordChangeScene extends PasswordChangeSceneBase {

  async dealWith ({password}) {
    
    const {accountCtrl} = this.controllers
    return await accountCtrl.updatePassword(password)
  }
}

module.exports = PasswordChangeScene
