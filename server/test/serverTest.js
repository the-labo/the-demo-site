/**
 * Test for server.
 * Runs with mocha.
 */
'use strict'

const aport = require('aport')
const arequest = require('arequest')
const asleep = require('asleep')
const { equal, ok } = require('assert')
const fs = require('fs')
const createDB = require('../db/create')
const createServer = require('../server/create')

describe('server', () => {
  let server
  let port
  let db
  before(async () => {
    port = await aport()
    db = createDB({
      dialect: 'memory',
    }, { enableHooks: false })
    server = createServer({
      db,
    })
    await server.listen(port)
    await asleep(100)
  })

  after(async () => {
    await asleep(100)
    await server.close()
    await asleep(100)
  })

  it('Get index page', async () => {
    const { body, statusCode } = await arequest({
      method: 'GET',
      url: `http://localhost:${port}`,
    })
    equal(statusCode, 200)
    ok(!!body)
  })
})

/* global describe, before, after, it */
