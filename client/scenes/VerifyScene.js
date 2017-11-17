/**
 * VerifyScene
 * @class VerifyScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends VerifyScene */
const VerifyScene = cn.compose(
)(
  class VerifySceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.verify
    }
  }
)

module.exports = VerifyScene
