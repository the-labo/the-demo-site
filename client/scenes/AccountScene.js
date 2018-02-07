/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const {bindScope, withBusy, withReady} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withReady
@bindScope('account')
class AccountSceneBase extends Scene {}

/** @lends AccountScene */
class AccountScene extends AccountSceneBase {
  @withBusy.while
  @withReady.when
  async doSync () {
    const {accountCtrl} = this.controllers
    const user = await accountCtrl.getCurrentUser()
    this.set({user})
  }
}

module.exports = AccountScene
