/**
 * _heckScene
 * @class _heckScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends _heckScene */
const _heckScene = cn.compose(
)(
  class _heckSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.heck
    }
  }
)

module.exports = _heckScene
