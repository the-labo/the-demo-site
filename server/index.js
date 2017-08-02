/**
 * Application server
 * @module server
 */
'use strict'

const server = require('./server')
const db = require('./db')
const env = require('./env')

module.exports = {
  server,
  db,
  env
}
