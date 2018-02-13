/**
 * AdminUserListScene
 * @class AdminUserListScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const ListScene = require('./abstract/ListScene')

@bindScope('admin.user.list')
class AdminUserListSceneBase extends ListScene {}

/** @lends AdminUserListScene */
class AdminUserListScene extends AdminUserListSceneBase {

  async detailWith (condition) {
    const {adminUserCtrl} = this.controllers
    return await adminUserCtrl.list(condition)
  }

}

module.exports = AdminUserListScene
