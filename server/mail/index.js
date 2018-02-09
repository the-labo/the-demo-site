/**
 * Mail module
 * @module mail
 */
'use strict'

const create = require('./create')
const env = require('../env')

const singleton = create(env.mail)
Object.assign(singleton, {
  create,
})

module.exports = singleton
