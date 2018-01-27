/**
 * AdminUserSearchScene
 * @class AdminUserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@bindScope('admin.user.search')
class AdminUserSearchSceneBase extends Scene {}

/** @lends AdminUserSearchScene */
class AdminUserSearchScene extends AdminUserSearchSceneBase {
}

module.exports = AdminUserSearchScene
