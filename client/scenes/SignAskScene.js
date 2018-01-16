/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withBack} = require('the-scene-mixins/shim')

@withBusy
@withBack
@bindScope('signAsk')
class SignaskSceneBase extends Scene {}

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {

}

module.exports = SignaskScene
