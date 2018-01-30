/**
 * Mail module
 * @module mail
 */
'use strict'

const env = require('../env')
const create = require('./create')

const singleton = create(env.mail)
Object.assign(singleton, {
  create,
})

module.exports = singleton
