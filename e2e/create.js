/**
 * Create e2e instance
 * @function create
 * @returns {TheE2E} - E2E instance
 */
'use strict'

const theE2E = require('the-e2e').default
const {E2EConfig} = require('./constants')

function create () {
  const e2e = theE2E(E2EConfig)
  return e2e
}

module.exports = create
