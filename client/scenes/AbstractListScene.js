/**
 * AbstractListScene
 * @class AbstractListScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AbstractListScene */
const AbstractListScene = cn.compose(
)(
  class AbstractListSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.abstractList
    }
  }
)

module.exports = AbstractListScene
