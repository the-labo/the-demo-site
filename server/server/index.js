'use strict'

const create = require('./create')
const env = require('../env')
const db = require('../db')
const mail = require('../mail')
const {locales} = require('../../conf')

const singleton = create({
  locales,
  db,
  mail,
  redis: env.redis,
})

Object.assign(singleton, {
  create,
  db,
  mail,
  env
})

module.exports = singleton
