/**
 * _rocessScene
 * @class _rocessScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends _rocessScene */
const _rocessScene = cn.compose(
)(
  class _rocessSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.rocess
    }
  }
)

module.exports = _rocessScene
