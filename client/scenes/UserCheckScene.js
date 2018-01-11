/**
 * UserCheckScene
 * @class UserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserCheckScene */
const UserCheckScene = cn.compose(
  cn.withValues
)(
  class UserCheckSceneBase extends Scene {
    get scope () {
      return this.store.userCheck
    }
  }
)

module.exports = UserCheckScene
