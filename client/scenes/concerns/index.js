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
const withSet = require('./withSet')
const withValues = require('./withValues')

module.exports = {
  compose,
  withBack,
  withBusy,
  withEntry,
  withFailure,
  withSet,
  withValues
}
