/**
 * UserCheckScene
 * @class UserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const UserCheckSceneBase = cn.compose(
  cn.withValues
)(Scene)

/** @lends UserCheckScene */
class UserCheckScene extends UserCheckSceneBase {
  get scope () {
    return this.store.userCheck
  }
}

module.exports = UserCheckScene
