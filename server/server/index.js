'use strict'

const db = require('../db')
const env = require('../env')
const mail = require('../mail')
const create = require('./create')
const {locales,} = require('../../conf')

const singleton = create({
  db,
  locales,
  mail,
  redis: env.redis,
})

module.exports = singleton
