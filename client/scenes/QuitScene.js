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
      return this.store.quit
    }

    async doQuit () {
      const quitCtrl = await this.use('quitCtrl')
      await this.busyFor(async () => {
        await quitCtrl.execute()
      })
    }

    goToCancel () {
      this.goTo(Urls.TOP_URL)
    }

    goToDone () {
      this.goTo(Urls.TOP_URL)
    }
  }
)

module.exports = QuitScene
