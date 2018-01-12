/**
 * UserCheckScene
 * @class UserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withValues} =  require('the-scene-mixins/shim')

const UserCheckSceneBase = compose(
  withValues
)(Scene)

/** @lends UserCheckScene */
class UserCheckScene extends UserCheckSceneBase {
  get scope () {
    return this.store.userCheck
  }
}

module.exports = UserCheckScene
