/**
 * Test for store.
 * Runs with mocha.
 */
'use strict'

const { create } = require('../store')
const { ok, equal } = require('assert')

describe('store', () => {
  before(() => {
  })

  after(() => {
  })

  it('Store test', () => {
    let store = create({})
    ok(store)

    {
      const { app } = store
    }
  })
})

/* global describe, before, after, it */
