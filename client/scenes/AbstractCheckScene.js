/**
 * AbstractCheckScene
 * @class AbstractCheckScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AbstractCheckScene */
const AbstractCheckScene = cn.compose(
)(
  class AbstractCheckSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.abstractCheck
    }
  }
)

module.exports = AbstractCheckScene
