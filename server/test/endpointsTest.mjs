/**
 * Test for endpoints.
 * Runs with mocha.
 */
'use strict'

import routes from '../endpoints/routes'
import createDB from '../db/create'
import assert from 'assert'

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
