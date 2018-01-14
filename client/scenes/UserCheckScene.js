/**
 * UserCheckScene
 * @class UserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withValues} = require('the-scene-mixins/shim')

@withValues
@forScope('userCheck')
class UserCheckSceneBase extends Scene {}

/** @lends UserCheckScene */
class UserCheckScene extends UserCheckSceneBase {
}

module.exports = UserCheckScene
