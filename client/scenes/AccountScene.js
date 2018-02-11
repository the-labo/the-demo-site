/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const DetailScene = require('./abstract/DetailScene')

@bindScope('account')
class AccountSceneBase extends DetailScene {}

/** @lends AccountScene */
class AccountScene extends AccountSceneBase {
  async dealWith (id) {
    const {accountCtrl} = this.controllers
    return await accountCtrl.getCurrentUser()
  }
}

module.exports = AccountScene
