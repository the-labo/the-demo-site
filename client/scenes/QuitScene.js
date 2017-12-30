/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const {Urls} = require('@self/conf')

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

    goToCancel () {
      const s = this
      s.goTo(Urls.TOP_URL)
    }

    goToDone(){
      const s = this
      s.goTo(Urls.TOP_URL)
    }
  }
)

module.exports = QuitScene
