/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const {withBusy, bindScope} = require('the-scene-mixins/shim')

@withBusy
@bindScope('account')
class AccountSceneBase extends Scene {}

/** @lends AccountScene */
class AccountScene extends AccountSceneBase {

  @withBusy.while
  async doSync () {
    const {accountCtrl} = this.controllers
    const user = await accountCtrl.getCurrentUser()
    this.set({user, synced: true})
  }
}

module.exports = AccountScene
