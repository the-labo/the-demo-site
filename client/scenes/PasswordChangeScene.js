/**
 * PasswordChangeScene
 * @class PasswordChangeScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends PasswordChangeScene */
const PasswordChangeScene = cn.compose(
  cn.withBusy,
  cn.withEntry
)(
  class PasswordChangeSceneBase extends Scene {
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
)

module.exports = PasswordChangeScene
