/**
 * Test for db.
 * Runs with mocha.
 */
'use strict'

const createDB = require('../db/create')
const { ok, equal } = require('assert')

describe('db', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    let db = createDB()
    ok(db)
  })
})

/* global describe, before, after, it */
