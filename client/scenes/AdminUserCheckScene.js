/**
 * AdminUserCheckScene
 * @class AdminUserCheckScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withValues} = require('the-scene-mixins/shim')

@withValues
@bindScope('admin.user.check')
class AdminUserCheckSceneBase extends Scene {}

/** @lends AdminUserCheckScene */
class AdminUserCheckScene extends AdminUserCheckSceneBase {
}

module.exports = AdminUserCheckScene
