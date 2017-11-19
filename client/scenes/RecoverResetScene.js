/**
 * RecoverResetScene
 * @class RecoverResetScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends RecoverResetScene */
const RecoverResetScene = cn.compose(
  cn.withEntry,
  cn.withBusy,
  cn.withFailure
)(
  class RecoverResetSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.recover.reset
    }

    async doReset () {
      const s = this
      const {l} = s
      const recoverCtrl = await s.use('recoverCtrl')
      s.clearFailure()
      await s.busyFor(async () => {
        await s.processEntry(({password}) =>
          recoverCtrl.reset({
            password,
            seal: s.get('seal'),
            envelop: s.get('envelop'),
          }).catch((e) =>
            s.catchFailure({
              'ExpiredError': l('errors.RECOVER_EXPIRED_ERROR'),
              default: l('errors.RECOVER_FAILED_ERROR')
            })
          )
        )
      })
    }
  }
)

module.exports = RecoverResetScene
