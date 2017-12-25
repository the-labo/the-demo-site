/**
 * Test for db.
 * Runs with mocha.
 */
'use strict'

require('the-polyfill')()

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
      await user01.update({name: 'bar'})

      ok(user01)
      const profile = await Profile.ofUser(user01)
      ok(profile)
    }

    {
      const {Alias} = db.resources
      const alias01 = await Alias.ofUrl('http://hoge.example.com/foo/bar?bar=x')
      const alias02 = await Alias.ofUrl('http://hoge.example.com/foo/bar?bar=x')
      equal(alias01.shortUrl, alias02.shortUrl)
    }
  })
})

/* global describe, before, after, it */
