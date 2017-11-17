/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends QuitScene */
const QuitScene = cn.compose(
  cn.withEntry,
  cn.withBusy,
  cn.withSet
)(
  class QuitSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.sign.del
    }

    prepare () {
      const s = this
      s.set({confirm: false, done: false})
    }

    async doQuit () {
      const s = this
      const quitCtrl = await s.use('quitCtrl')
      await s.busyFor(async () => {
        await quitCtrl.execute()
      })
      s.set({confirm: false, done: true})
    }
  }
)

module.exports = QuitScene
