/**
 * AdminUserListScene
 * @class AdminUserListScene
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
@bindScope('admin.user.list')
@bindDefaults({filter: {}, pageNumber: 1, pageSize: 25,})
class AdminUserListSceneBase extends Scene {}

/** @lends AdminUserListScene */
class AdminUserListScene extends AdminUserListSceneBase {
  setQ (q) {
    this.set({pageNumber: 1})
    this.setFilterByQ(q, {fields: ['name', 'profile.name', 'profile.email']})
    this.replaceHistoryByQuery({q})
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const {adminUserCtrl} = this.controllers
    const {entities, meta: counts,} = await adminUserCtrl.list({
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort()
    })
    this.set({counts, entities})
  }
}

module.exports = AdminUserListScene
