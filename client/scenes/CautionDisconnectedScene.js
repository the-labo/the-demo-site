/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const {get} = require('the-window')

/** @lends CautionDisconnectedScene */
const CautionDisconnectedScene = cn.compose(
  cn.withBusy
)(
  class CautionDisconnectedSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.cautionDisconnected
    }

    async doReload () {
      const s = this
      s.set({busy: true})
      const location = get('location')
      location.reload()
    }
  }
)

module.exports = CautionDisconnectedScene
