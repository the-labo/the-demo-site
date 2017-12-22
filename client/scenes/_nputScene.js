/**
 * _nputScene
 * @class _nputScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends _nputScene */
const _nputScene = cn.compose(
)(
  class _nputSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.nput
    }
  }
)

module.exports = _nputScene
