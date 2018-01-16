/**
 * UserCheckScene
 * @class UserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withValues} = require('the-scene-mixins/shim')

@withValues
@bindScope('userCheck')
class UserCheckSceneBase extends Scene {}

/** @lends UserCheckScene */
class UserCheckScene extends UserCheckSceneBase {
}

module.exports = UserCheckScene
