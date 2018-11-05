/**
 * AdminUserCheckScene
 * @class AdminUserCheckScene
 */
'use strict'

const { bindDefaults, bindScope } = require('the-scene-mixins/shim')
const HashScene = require('./abstract/HashScene')

@bindScope('admin.user.check')
@bindDefaults({ready: true})
class AdminUserCheckSceneBase extends HashScene {}

/** @lends AdminUserCheckScene */
class AdminUserCheckScene extends AdminUserCheckSceneBase {
}

module.exports = AdminUserCheckScene
