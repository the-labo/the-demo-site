/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends CautionDisconnectedScene */
const CautionDisconnectedScene = cn.compose(
  cn.withBusy,
  cn.withLocation
)(
  class CautionDisconnectedSceneBase extends Scene {
    get scope () {
      return this.store.cautionDisconnected
    }

    async doReload () {
      this.set({busy: true})
      this.reloadLocation()
    }
  }
)

module.exports = CautionDisconnectedScene
