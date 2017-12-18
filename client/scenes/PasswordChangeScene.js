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
      const s = this
      return s.store.passwordChange
    }

    async doSave () {
      const s = this
      const passwordCtrl = await s.use('passwordCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({password}) =>
          passwordCtrl.update(password))
      })

    }
  }
)

module.exports = PasswordChangeScene
