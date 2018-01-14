/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const {withBusy, forScope} = require('the-scene-mixins/shim')

@withBusy
@forScope('account')
class AccountSceneBase extends Scene {}

/** @lends AccountScene */
class AccountScene extends AccountSceneBase {

  @withBusy.while
  async doSync () {
    const accountCtrl = await this.use('accountCtrl')
    const user = await accountCtrl.getCurrentUser()
    this.set({user, synced: true})
  }
}

module.exports = AccountScene
