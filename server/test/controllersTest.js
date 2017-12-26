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
    const {SignCtrl, AccountCtrl, QuitCtrl,PasswordCtrl} = controllers
    const session = {}
    const db = createDB({
      dialect: 'memory'
    })
    const app = {db}
    const client = {}
    const signCtrl = new SignCtrl({app, client, session})
    const accountCtrl = new AccountCtrl({app, client, session})
    const quitCtrl = new QuitCtrl({app, client, session})
    const passwordCtrl = new PasswordCtrl({app, client, session})

    await signCtrl.signUp('foo', 'bar')

    const user = await accountCtrl.getCurrentUser()
    equal(user.name, 'foo')

    await signCtrl.signOut()
    ok(!(await accountCtrl.getCurrentUser()))

    ok(await signCtrl.signIn('foo', 'bar'))
    await passwordCtrl.update('bar2')
    ok(await signCtrl.signIn('foo', 'bar2'))

    await accountCtrl.updateProfile(({
      email: 'foo@example.com'
    }))

    await quitCtrl.execute()
  })
})

/* global describe, before, after, it */
