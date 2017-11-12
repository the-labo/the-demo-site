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
const withToggle = require('./withToggle')

module.exports = {
  compose,
  withBack,
  withBusy,
  withEntry,
  withFailure,
  withSet,
  withToggle
}
