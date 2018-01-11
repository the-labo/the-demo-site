/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const CautionDisconnectedSceneBase = cn.compose(
  cn.withBusy,
  cn.withLocation
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
