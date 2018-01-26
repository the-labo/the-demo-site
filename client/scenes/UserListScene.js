/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const {
  bindDefaults,
  bindScope,
  withBusy,
  withFilter,
  withHistory,
  withPage,
  withReady,
  withSort,
} = require('the-scene-mixins/shim')

@withBusy
@withSort
@withPage
@withReady
@withFilter
@withHistory
@bindScope('userList')
@bindDefaults({filter: {}, pageNumber: 1, pageSize: 25,})
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
    const {entities, meta: counts,} = await userCtrl.list({
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort()
    })
    this.set({counts, entities})
  }
}

module.exports = UserListScene
