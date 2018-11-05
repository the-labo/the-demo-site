/**
 * Test for db.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const { SUPER_ADMIN_NAME } = require('@self/Local')
const createDB = require('../db/create')

describe('db', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const db = createDB({
      dialect: 'memory',
    })
    ok(db)
    {
      const { Profile, User } = db.resources
      const user01 = await User.create({ name: 'foo' })
      await user01.update({ name: 'bar' })

      ok(user01)
      const profile = await Profile.ofUser(user01)
      ok(profile)
      {
        const superadmin = await User.create({ name: SUPER_ADMIN_NAME })
        const users = await User.all({ name: 'bar' })
        equal(users.length, 1)
        ok(await User.one(superadmin.id))
      }
    }

    {
      const { Alias } = db.resources
      const alias01 = await Alias.ofUrl('http://hoge.example.com/foo/bar?bar=x')
      const alias02 = await Alias.ofUrl('http://hoge.example.com/foo/bar?bar=x')
      equal(alias01.shortUrl, alias02.shortUrl)
    }
  })
})

/* global describe, before, after, it */
