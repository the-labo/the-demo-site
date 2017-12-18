/**
 * AppScene
 * @class AppScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AppScene */
const AppScene = cn.compose(
  cn.withBusy
)(
  class AppSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store['app']
    }
  }
)

module.exports = AppScene
