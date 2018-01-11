/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AccountScene */
const AccountScene = cn.compose(
  cn.withBusy
)(
  class AccountSceneBase extends Scene {
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
)

module.exports = AccountScene
