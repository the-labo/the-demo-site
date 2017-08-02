'use strict'

const create = require('./create')

const singleton = create.for('singleton')

Object.assign(singleton, {
  create
})

module.exports = singleton
