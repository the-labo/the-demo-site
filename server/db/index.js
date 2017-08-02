/**
 * Database module
 * @module db
 */
'use strict'

const env = require('../env')
const create = require('./create')

const singleton = create(env.database)
Object.assign(singleton, {
  create
})

module.exports = singleton
