/**
 * AbstractProcessScene
 * @class AbstractProcessScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AbstractProcessScene */
const AbstractProcessScene = cn.compose(
)(
  class AbstractProcessSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.abstractProcess
    }
  }
)

module.exports = AbstractProcessScene
