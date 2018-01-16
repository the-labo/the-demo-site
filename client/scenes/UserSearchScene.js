/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@bindScope('userSearch')
class UserSearchSceneBase extends Scene {}

/** @lends UserSearchScene */
class UserSearchScene extends UserSearchSceneBase {
}

module.exports = UserSearchScene
