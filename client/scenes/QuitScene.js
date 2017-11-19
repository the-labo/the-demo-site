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
)(
  class QuitSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.quit
    }

    async doQuit () {
      const s = this
      const quitCtrl = await s.use('quitCtrl')
      await s.busyFor(async () => {
        await quitCtrl.execute()
      })
    }
  }
)

module.exports = QuitScene
