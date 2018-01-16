/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')
const {bindScope, withBusy, withLocation} = require('the-scene-mixins/shim')

@withBusy
@withLocation
@bindScope('cautionDisconnected')
class CautionDisconnectedSceneBase extends Scene {}

/** @lends CautionDisconnectedScene */
class CautionDisconnectedScene extends CautionDisconnectedSceneBase {
  @withBusy.while
  async doReload () {
    this.reloadLocation()
  }

  async watchToReload () {
    const timer = setInterval(async () => {
      const {ok} = await fetch(Urls.STATUS_URL).catch(() => null)
      if (ok) {
        clearInterval(timer)
        await this.doReload()
      }
    }, 3000)
  }
}

module.exports = CautionDisconnectedScene
