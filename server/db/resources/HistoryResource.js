/**
 * @class HistoryResource
 * @augments Resource
 */
'use strict'

const { TheHistoryResource } = require('the-site-resources')
const { HistoryTypes } = require('@self/conf')

/** @lends HistoryResource */
class HistoryResource extends TheHistoryResource {
  static get types () {
    return HistoryTypes
  }
}

module.exports = HistoryResource
