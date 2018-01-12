/**
 * PasswordChangeScene
 * @class PasswordChangeScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry} =  require('the-scene-mixins/shim')

const PasswordChangeSceneBase = compose(
  withBusy,
  withEntry
)(Scene)

/** @lends PasswordChangeScene */
class PasswordChangeScene extends PasswordChangeSceneBase {
  get scope () {
    return this.store.passwordChange
  }

  async doSave () {
    const accountCtrl = await this.use('accountCtrl')
    await this.busyFor(async () => {
      await this.processEntry(({password}) =>
        accountCtrl.updatePassword(password))
    })
  }
}

module.exports = PasswordChangeScene
