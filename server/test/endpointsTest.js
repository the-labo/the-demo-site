/**
 * Test for endpoints.
 * Runs with mocha.
 */
'use strict'

const routes = require('../endpoints/routes')
const createDB = require('../db/create')
const assert = require('assert')

const {ok, equal} = assert

describe('endpoints', () => {
  const db = createDB({
    dialect: 'memory'
  })
  const {Alias} = db.resources
  before(() => {
  })

  after(() => {
  })

  it('aliasEndpoint', async () => {
    const alias = await Alias.ofUrl('http://example.com/foo/bar')

    let redirected
    const ctx = {
      app: {db},
      params: {key: alias.key},
      redirect (url) {
        redirected = url
      }
    }
    await routes.aliasRoute(ctx)
    equal('http://example.com/foo/bar', redirected)
  })
})

/* global describe, before, after, it */
