/**
 * AdminUserFilterScene
 * @class AdminUserFilterScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@bindScope('admin.user.filter')
class AdminUserFilterSceneBase extends Scene {}

/** @lends AdminUserFilterScene */
class AdminUserFilterScene extends AdminUserFilterSceneBase {
}

module.exports = AdminUserFilterScene
