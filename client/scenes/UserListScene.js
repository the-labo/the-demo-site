/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withSort, withPage, withReady, withFilter, withHistory,} =  require('the-scene-mixins/shim')

const UserListSceneBase = compose(
  withBusy,
  withSort,
  withPage,
  withReady,
  withFilter,
  withHistory
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
