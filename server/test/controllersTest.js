/**
 * Test for controllers.
 * Runs with mocha.
 */
'use strict'

const controllers = require('../controllers')
const createDB = require('../db/create')
const {equal, ok,} = require('assert')
const {servicesProxy} = require('the-service-base')
const {ServiceMapping} = require('../mappings')

describe('controllers', () => {
  before(() => {
  })

  after(() => {
  })

  it('Sign Ctrl', async () => {
    const {AccountCtrl, QuitCtrl, SignCtrl,} = controllers
    const session = {}
    const db = createDB({
      dialect: 'memory'
    })
    const app = {db, services: servicesProxy(ServiceMapping, db)}
    const client = {}
    const signCtrl = new SignCtrl({app, client, session})
    const accountCtrl = new AccountCtrl({app, client, session})
    const quitCtrl = new QuitCtrl({app, client, session})

    await signCtrl.signUp('foo', 'bar')

    const user = await accountCtrl.getCurrentUser()
    equal(user.name, 'foo')

    await signCtrl.signOut()
    ok(!(await accountCtrl.getCurrentUser()))

    ok(await signCtrl.signIn('foo', 'bar'))
    await accountCtrl.syncUser()
    await accountCtrl.updatePassword('bar2')
    ok(await signCtrl.signIn('foo', 'bar2'))

    await accountCtrl.updateProfile(({
      email: 'foo@example.com'
    }))

    await quitCtrl.execute()
  })

  it('User Ctrl', async () => {
    const {UserCtrl} = controllers
    const session = {}
    const db = createDB({
      dialect: 'memory'
    })
    const app = {db, services: servicesProxy(ServiceMapping, db)}
    const client = {}
    const userCtrl = new UserCtrl({app, client, session})
    userCtrl._assertAsAdmin = () => null

    await userCtrl.create({
      name: 'foo'
    })

    const listed = await userCtrl.list({
      filter: [{name: 'foo'}]
    })
    console.log(listed)
  })
})

/* global describe, before, after, it */
