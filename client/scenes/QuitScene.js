/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry,} =  require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')

const QuitSceneBase = compose(
  withEntry,
  withBusy,
)(Scene)

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {
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

module.exports = QuitScene
