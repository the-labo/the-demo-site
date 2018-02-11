/**
 * ListScene
 * @abstract
 * @class ListScene
 */
'use strict'

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
const Scene = require('./Scene')

@withBusy
@withSort
@withPage
@withReady
@withFilter
@withHistory
@bindDefaults({filter: {}, pageNumber: 1, pageSize: 50})
class ListSceneBase extends Scene {}

/** @lends ListScene */
class ListScene extends ListSceneBase {
  getCondition () {
    return {
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort(),
    }
  }

  setQ (q) {
    this.set({pageNumber: 1})
    this.setFilterByQ(q, {fields: this.constructor.qField})
    this.replaceHistoryByQuery({q})
  }

  async detailWith (condition) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const {entities, meta: counts} = await this.detailWith(this.getCondition())
    this.set({counts, entities})
  }

  static qField = ['name']
}

module.exports = ListScene
