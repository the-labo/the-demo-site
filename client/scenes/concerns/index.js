/**
 * Scene concerns
 * @module concerns
 */
'use strict'

const compose = require('./compose')
const withBack = require('./withBack')
const withBusy = require('./withBusy')
const withEntry = require('./withEntry')
const withFailure = require('./withFailure')
const withFilter = require('./withFilter')
const withHistory = require('./withHistory')
const withLocation = require('./withLocation')
const withPage = require('./withPage')
const withQuery = require('./withQuery')
const withReady = require('./withReady')
const withSort = require('./withSort')
const withValues = require('./withValues')

module.exports = {
  compose,
  withBack,
  withBusy,
  withEntry,
  withFailure,
  withFilter,
  withHistory,
  withLocation,
  withPage,
  withQuery,
  withReady,
  withSort,
  withValues
}

exports.compose = compose
exports.withBack = withBack
exports.withBusy = withBusy
exports.withEntry = withEntry
exports.withFailure = withFailure
exports.withFilter = withFilter
exports.withHistory = withHistory
exports.withLocation = withLocation
exports.withPage = withPage
exports.withQuery = withQuery
exports.withReady = withReady
exports.withSort = withSort
exports.withValues = withValues
