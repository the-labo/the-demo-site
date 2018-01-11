/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const UserListSceneBase = cn.compose(
  cn.withBusy,
  cn.withSort,
  cn.withPage,
  cn.withReady,
  cn.withFilter,
  cn.withHistory
)(Scene)

/** @lends UserListScene */
class UserListScene extends UserListSceneBase {
  get scope () {
    return this.store.userList
  }

  setQ (q) {
    this.set({pageNumber: 1})
    this.setFilterByQ(q, {fields: ['name']})
    this.replaceHistoryByQuery({q})
  }

  get defaults () {
    return {
      pageNumber: this.defaultPageNumber,
      pageSize: this.defaultPageSize,
      filter: {}
    }
  }

  async doSync () {
    const userCtrl = await this.use('userCtrl')
    await this.busyFor(async () => {
      const {meta: counts, entities} = await userCtrl.list({
        filter: this.getFilter(),
        page: this.getPage(),
        sort: this.getSort()
      })
      this.set({counts, entities})
    })
  }
}

module.exports = UserListScene
