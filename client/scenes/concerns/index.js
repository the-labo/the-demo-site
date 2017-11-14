/**
 * Scene concerns
 * @module concerns
 */
'use strict'

const compose = require('./compose')
const withBack = require('./withBack')
const withBusy = require('./withBusy')
const withChecked = require('./withChecked')
const withEntry = require('./withEntry')
const withFailure = require('./withFailure')
const withList = require('./withList')
const withSet = require('./withSet')
const withToggle = require('./withToggle')

module.exports = {
  compose,
  withBack,
  withBusy,
  withChecked,
  withEntry,
  withFailure,
  withList,
  withSet,
  withToggle
}
