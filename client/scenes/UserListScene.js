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
  cn.withPage,
  cn.withReady
)(
  class UserListSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.userList
    }

    setQ (q) {
      const s = this
      s.set({
        pageNumber: 1,
        filter: q ? {name: {$like: `%${String(q).trim()}%`}} : {}
      })
      if (!q) {
        s.init('filter')
      }
      s.replaceQuery({q})
    }

    get defaults () {
      const s = this
      return {
        pageNumber: s.defaultPageNumber,
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
