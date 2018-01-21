/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const {
  bindScope,
  bindDefaults,
  withBusy,
  withSort,
  withPage,
  withReady,
  withFilter,
  withHistory,
} = require('the-scene-mixins/shim')

@withBusy
@withSort
@withPage
@withReady
@withFilter
@withHistory
@bindScope('userList')
@bindDefaults({pageNumber: 1, pageSize: 25, filter: {},})
class UserListSceneBase extends Scene {}

/** @lends UserListScene */
class UserListScene extends UserListSceneBase {
  setQ (q) {
    this.set({pageNumber: 1})
    this.setFilterByQ(q, {fields: ['name', 'profile.name', 'profile.email']})
    this.replaceHistoryByQuery({q})
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const {userCtrl} = this.controllers
    const {meta: counts, entities} = await userCtrl.list({
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort()
    })
    this.set({counts, entities})
  }
}

module.exports = UserListScene
