/**
 * _istScene
 * @class _istScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends _istScene */
const _istScene = cn.compose(
)(
  class _istSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.ist
    }
  }
)

module.exports = _istScene
