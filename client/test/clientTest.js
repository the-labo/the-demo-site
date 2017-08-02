/**
 * Test for client.
 * Runs with mocha.
 */
'use strict'

const { create } = require('../client')
const { ok, equal } = require('assert')

describe('client', () => {
  before(() => {
  })

  after(() => {
  })

  it('Create test', () => {
    let created = create()
    ok(created)
  })
})

/* global describe, before, after, it */
