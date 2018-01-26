'use strict'

const create = require('./create')
const env = require('../env')
const db = require('../db')
const mail = require('../mail')
const {locales} = require('../../conf')

const singleton = create({
  db,
  locales,
  mail,
  redis: env.redis,
})

module.exports = singleton

