/**
 * Test for controllers.
 * Runs with mocha.
 */
'use strict'

require('the-polyfill')()

const controllers = require('../controllers')
const createDB = require('../db/create')
const {ok, equal} = require('assert')

describe('controllers', () => {
  before(() => {
  })

  after(() => {
  })

  it('Sign Ctrl', async () => {
    const {SignCtrl} = controllers
    const session = {}
    const db = createDB({
      dialect: 'memory'
    })
    const signCtrl = new SignCtrl({
      app: {db: db},
      client: {},
      session
    })

    await signCtrl.signup('foo', 'bar')

    const signed = await signCtrl.getSigned()
    equal(signed.user.name, 'foo')

    await signCtrl.signout()
    ok(!(await signCtrl.getSigned()))

    ok(await signCtrl.signin('foo', 'bar'))

    await signCtrl.signdel()

  })
})

/* global describe, before, after, it */
