/**
 * AdminUserFilterScene
 * @class AdminUserFilterScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const FilterScene = require('./abstract/FilterScene')

@bindScope('admin.user.filter')
class AdminUserFilterSceneBase extends FilterScene {}

/** @lends AdminUserFilterScene */
class AdminUserFilterScene extends AdminUserFilterSceneBase {
}

module.exports = AdminUserFilterScene
