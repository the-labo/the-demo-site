/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

const theServer = require('the-server')
const {Html} = require('@self/client/shim/ui')
const {createClient, createStore} = require('@self/client')
const {
  AppCtrl,
  SignCtrl,
  AdminUsersCtrl
} = require('../controllers')
const pkg = require('../../package.json')
const env = require('../env')

/** @lends create */
function create (config) {
  const {locales, db, redis = env.redis} = config
  const server = theServer({
    static: ['public'],
    redis,
    injectors: {
      client: (ctx) => createClient(),
      store: (ctx) => createStore()
    },
    html: Html,
    langs: Object.keys(locales),
    scope: {
      pkg,
      db,
      locales
    }
  })

  server.load(AppCtrl, 'app')
  server.load(SignCtrl, 'sign')
  server.load(AdminUsersCtrl, 'adminUsers')

  return server
}

module.exports = create
