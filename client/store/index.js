'use strict'

const create = require('./create')
const { connect } = require('the-store')

const singleton = create({})

Object.assign(singleton, {
  create,
  connect
})

module.exports = singleton
