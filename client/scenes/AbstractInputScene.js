/**
 * AbstractInputScene
 * @class AbstractInputScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AbstractInputScene */
const AbstractInputScene = cn.compose(
)(
  class AbstractInputSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.abstractInput
    }
  }
)

module.exports = AbstractInputScene
