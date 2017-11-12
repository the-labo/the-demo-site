/**
 * AccountScene
 * @class AccountScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends AccountScene */
const AccountScene = cn.compose(
  cn.withBusy,
  cn.withSet
)(
  class AccountSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.account
    }

    async syncUser () {
      const s = this
      const accountCtrl = await s.use('accountCtrl')
      await s.busyFor(async () => {
        const user = await accountCtrl.getCurrentUser()
        s.set({user})
      })
      s.toggle({synced: true})
    }
  }
)

module.exports = AccountScene
