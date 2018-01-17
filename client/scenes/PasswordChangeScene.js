/**
 * PasswordChangeScene
 * @class PasswordChangeScene
 */
'use strict'

const Scene = require('./Scene')
const {withBusy, withEntry, bindScope} = require('the-scene-mixins/shim')

@withEntry
@withBusy
@bindScope('passwordChange')
class PasswordChangeSceneBase extends Scene {}

/** @lends PasswordChangeScene */
class PasswordChangeScene extends PasswordChangeSceneBase {
  @withBusy.while
  async doSave () {
    const {accountCtrl} = this.controllers
    await this.processEntry(({password}) =>
      accountCtrl.updatePassword(password))
  }
}

module.exports = PasswordChangeScene
