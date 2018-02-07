/**
 * @class HistoryResource
 * @augments Resource
 */
'use strict'

const {HistoryTypes} = require('@self/conf')
const {TheHistoryResource} = require('the-site-resources')

/** @lends HistoryResource */
class HistoryResource extends TheHistoryResource {

  static get types () {
    return HistoryTypes
  }

}

module.exports = HistoryResource
