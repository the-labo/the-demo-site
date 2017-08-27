/**
 * Test for db.
 * Runs with mocha.
 */
'use strict'

const createDB = require('../db/create')
const {ok, equal} = require('assert')

describe('db', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const db = createDB({
      dialect: 'memory'
    })
    ok(db)

    {
      const {User, Profile} = db.resources
      const user01 = await User.create({name: 'foo'})
      // await user01.update({name: 'bar'})

      console.log('user01', user01)
      const profile = await Profile.ofUser({user: user01})
      console.log('profile', profile)
    }
  })
})

/* global describe, before, after, it */
