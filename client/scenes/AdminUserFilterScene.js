/**
 * AdminUserFilterScene
 * @class AdminUserFilterScene
 */
'use strict'

const {bindScope, withBusy, withEntry} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@bindScope('admin.user.filter')
class AdminUserFilterSceneBase extends Scene {}

/** @lends AdminUserFilterScene */
class AdminUserFilterScene extends AdminUserFilterSceneBase {
}

module.exports = AdminUserFilterScene
