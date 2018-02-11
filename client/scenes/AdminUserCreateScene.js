/**
 * AdminUserCreateScene
 * @class AdminUserCreateScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@bindScope('admin.user.create')
class AdminUserCreateSceneBase extends InputScene {}

/** @lends AdminUserCreateScene */
class AdminUserCreateScene extends AdminUserCreateSceneBase {

  async dealWith (values) {
    const {adminUserCtrl} = this.controllers
    return adminUserCtrl.create(values)
  }
}

module.exports = AdminUserCreateScene
