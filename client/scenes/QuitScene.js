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
  cn.withToggle
)(
  class QuitSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.sign.del
    }

    async doQuit () {
      const s = this
      const quitCtrl = await s.use('quitCtrl')
      await s.busyFor(async () => {
        await quitCtrl.execute()
      })
      s.toggle({confirming: false, done: true})
    }
  }
)

module.exports = QuitScene
