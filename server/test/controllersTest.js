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

  it('Auth Ctrl', async () => {
    const {AuthCtrl} = controllers
    const session = {}
    const db = createDB({
      dialect: 'memory'
    })
    const app = {db}
    const client = {}
    const authCtrl = new AuthCtrl({app, client, session})

    await authCtrl.signup('foo', 'bar')

    const user = await authCtrl.getCurrentUser()
    equal(user.name, 'foo')

    await authCtrl.signout()
    ok(!(await authCtrl.getCurrentUser()))

    ok(await authCtrl.signin('foo', 'bar'))
    await authCtrl.updatePassword('bar2')
    ok(await authCtrl.signin('foo', 'bar2'))

    await authCtrl.updateProfile(({
      email: 'foo@example.com'
    }))

    await authCtrl.signdel()
  })
})

/* global describe, before, after, it */
