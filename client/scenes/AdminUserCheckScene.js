/**
 * AdminUserCheckScene
 * @class AdminUserCheckScene
 */
'use strict'

const {bindScope, withValues} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withValues
@bindScope('admin.user.check')
class AdminUserCheckSceneBase extends Scene {}

/** @lends AdminUserCheckScene */
class AdminUserCheckScene extends AdminUserCheckSceneBase {
}

module.exports = AdminUserCheckScene
