/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@forScope('userSearch')
class UserSearchSceneBase extends Scene {}

/** @lends UserSearchScene */
class UserSearchScene extends UserSearchSceneBase {
}

module.exports = UserSearchScene
