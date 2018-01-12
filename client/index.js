'use strict'

require('the-polyfill')()

const createStore = require('./store/create')
const createClient = require('./client/create')
const createHandle = require('./handle/create')
const ui = require('./ui')

module.exports = {
  ui,
  createStore,
  createClient,
  createHandle
}
