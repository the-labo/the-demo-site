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
  cn.withSort,
  cn.withPage
)(
  class UserListSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.userList
    }

    get defaults () {
      const s = this
      return {
        pageNumber: s.defaultPageSize,
        pageSize: s.defaultPageSize,
        filter: {}
      }
    }

    async doSync () {
      const s = this
      const userCtrl = await s.use('userCtrl')

      await s.busyFor(async () => {
        const {meta: counts, entities} = await userCtrl.list({
          filter: s.get('filter'),
          page: s.getPage(),
          sort: s.get('sort')
        })
        s.set({counts, entities})
      })
    }
  }
)

module.exports = UserListScene
