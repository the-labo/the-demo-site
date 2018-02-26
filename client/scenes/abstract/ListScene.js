/**
 * ListScene
 * @abstract
 * @class ListScene
 */
'use strict'

const {
  bindDefaults,
  withBusy,
  withEntities,
  withFilter,
  withHistory,
  withPage,
  withReady,
  withSort,
} = require('the-scene-mixins/shim')
const {hasMoreFor} = require('the-site-util')
const Scene = require('./Scene')

@withBusy
@withSort
@withEntities
@withPage
@withReady
@withFilter
@withHistory
@bindDefaults({counts: {}, entities: [], filter: {}, pageNumber: 1, pageSize: 25})
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

  /**
   * Do sync for more
   * @returns {Promise<void>}
   */
  async doSyncMore () {
    const pageNumber = this.get('pageNumber')
    this.set({pageNumber: pageNumber + 1})

    const {entities, meta: counts} = await this.dealWith(this.getCondition())
    this.set({counts: counts, hasMore: hasMoreFor(counts)})
    this.addEntities(entities)
  }

  async doSyncOne (id) {
    const {entities: [one]} = await this.dealWith({
      filter: {id},
      page: {number: 1, size: 1},
    })
    if (one) {
      this.updateEntity(one)
    }
  }

  static qField = ['name']
}

module.exports = ListScene
