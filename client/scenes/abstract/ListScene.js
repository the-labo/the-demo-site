/**
 * ListScene
 * @abstract
 * @class ListScene
 */
'use strict'

const {uniqueFilter} = require('the-array')
const {
  bindDefaults,
  withBusy,
  withFilter,
  withHistory,
  withPage,
  withReady,
  withSort,
} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

const hasMoreFor = (counts) => {
  if (!counts) {
    return false
  }
  const {length, offset, total} = counts
  return offset + length < total
}

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

  async dealWith (condition) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const {entities, meta: counts} = await this.dealWith(this.getCondition())
    this.set({counts, entities, hasMore: hasMoreFor(counts)})
  }

  async doSyncMore () {
    const pageNumber = this.get('pageNumber')
    this.set({pageNumber: pageNumber + 1})
    const {counts, entities} = await this.dealWith(this.getCondition())
    this.set({
      counts: counts,
      entities: [...this.get('entities'), ...entities].filter(uniqueFilter.by('id')),
      hasMore: hasMoreFor(counts),
    })
  }

  static qField = ['name']
}

module.exports = ListScene
