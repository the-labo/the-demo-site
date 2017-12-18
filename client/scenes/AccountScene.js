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
      const s = this
      return s.store.account
    }

    async doSync () {
      const s = this
      const accountCtrl = await s.use('accountCtrl')
      const verifyCtrl = await s.use('verifyCtrl')
      await s.busyFor(async () => {
        const user = await accountCtrl.getCurrentUser()
        s.set({user, synced: true})
      })
    }
  }
)

module.exports = AccountScene
