/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withLocation} =  require('the-scene-mixins/shim')

const CautionDisconnectedSceneBase = compose(
  withBusy,
  withLocation
)(Scene)

/** @lends CautionDisconnectedScene */
class CautionDisconnectedScene extends CautionDisconnectedSceneBase {
  get scope () {
    return this.store.cautionDisconnected
  }

  async doReload () {
    this.set({busy: true})
    this.reloadLocation()
  }
}

module.exports = CautionDisconnectedScene
