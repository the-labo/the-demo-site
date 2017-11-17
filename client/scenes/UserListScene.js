/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserListScene */
const UserListScene = cn.compose(
  cn.withBusy,
  cn.withSet
)(
  class UserListSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.user.list
    }

    async doSync () {
      const s = this
      const userCtrl = await s.use('userCtrl')

      await s.busyFor(async () => {
        const {meta, entities} = await userCtrl.list({
          filter: {},
          page: s.scope.page.state,
          sort: s.scope.sort.state
        })
        s.set({
          meta,
          entities
        })
      })
    }
  }
)

module.exports = UserListScene
