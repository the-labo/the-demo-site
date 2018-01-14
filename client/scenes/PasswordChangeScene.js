/**
 * PasswordChangeScene
 * @class PasswordChangeScene
 */
'use strict'

const Scene = require('./Scene')
const {withBusy, withEntry, forScope} = require('the-scene-mixins/shim')

@withEntry
@withBusy
@forScope('passwordChange')
class PasswordChangeSceneBase extends Scene {}

/** @lends PasswordChangeScene */
class PasswordChangeScene extends PasswordChangeSceneBase {
  @withBusy.while
  async doSave () {
    const accountCtrl = await this.use('accountCtrl')
    await this.processEntry(({password}) =>
      accountCtrl.updatePassword(password))
  }
}

module.exports = PasswordChangeScene
