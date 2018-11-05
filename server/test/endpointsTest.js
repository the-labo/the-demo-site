/**
 * Test for endpoints.
 * Runs with mocha.
 */
'use strict'

const assert = require('assert')
const createDB = require('../db/create')
const routes = require('../endpoints/routes')

const { equal, ok } = assert

describe('endpoints', () => {
  const db = createDB({
    dialect: 'memory',
  })
  const { Alias } = db.resources
  before(() => {
  })

  after(() => {
  })

  it('aliasRoute', async () => {
    const alias = await Alias.ofUrl('http://example.com/foo/bar.json')

    let redirected
    const ctx = {
      app: { db },
      params: { key: alias.key },
      redirect (url) {
        redirected = url
      },
    }
    await routes.aliasRoute(ctx)
    ok(/\.json$/.test(alias.key))
    equal('http://example.com/foo/bar.json', redirected)
  })

  it('uploadRoute', async () => {
    const ctx = {
      app: { db },
      req: {
        headers: {},
      },
    }
  })
})

/* global describe, before, after, it */
