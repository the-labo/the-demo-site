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
        const {meta: counts, entities} = await userCtrl.list({
          filter: s.get('filter'),
          page: {
            number: s.get('pageNumber')
          },
          sort: s.get('sort')
        })
        s.set({counts, entities})
      })
    }
  }
)

module.exports = UserListScene
