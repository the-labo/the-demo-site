/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy} = require('the-scene-mixins/shim')

const AccountSceneBase = compose(
  withBusy
)(Scene)

/** @lends AccountScene */
class AccountScene extends AccountSceneBase {
  get scope () {
    return this.store.account
  }

  async doSync () {
    const accountCtrl = await this.use('accountCtrl')
    await this.busyFor(async () => {
      const user = await accountCtrl.getCurrentUser()
      this.set({user, synced: true})
    })
  }
}

module.exports = AccountScene
