/**
 * RecoverSendScene
 * @class RecoverSendScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends RecoverSendScene */
const RecoverSendScene = cn.compose(
  cn.withEntry,
  cn.withBusy,
  cn.withSet,
  cn.withFailure
)(
  class RecoverSendSceneImpl extends Scene {
    get scope () {
      const s = this
      return s.store.recover.send
    }

    prepare () {
      const s = this
      s.clearFailure()
      s.dropEntry()
      s.set({done: false})
    }

    async doSend () {
      const s = this
      const {l} = s
      const recoverCtrl = await s.use('recoverCtrl')
      await s.busyFor(async () => {
        await s.processEntry(({email}) =>
          recoverCtrl.send(email).catch((e) =>
            s.catchFailure(e, {
              'UnknownEmailError': l('errors.RECOVER_UNKNOWN_EMAIL_ERROR'),
              default: l('errors.RECOVER_SEND_FAILED_ERROR')
            })
          )
        )
        s.set({done: true})
      })
    }
  }
)

module.exports = RecoverSendScene
