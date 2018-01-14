/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy, withSort, withPage, withReady, withFilter, withHistory,} = require('the-scene-mixins/shim')

@withBusy
@withSort
@withPage
@withReady
@withFilter
@withHistory
@forScope('userList')
class UserListSceneBase extends Scene {}

/** @lends UserListScene */
class UserListScene extends UserListSceneBase {
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

  @withBusy.while
  async doSync () {
    const userCtrl = await this.use('userCtrl')
    const {meta: counts, entities} = await userCtrl.list({
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort()
    })
    this.set({counts, entities})
  }
}

module.exports = UserListScene
