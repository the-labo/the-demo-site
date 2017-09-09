/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

const theServer = require('the-server')
const {Html} = require('@self/client/shim/ui')
const {createClient, createStore} = require('@self/client')
const theSeal = require('the-seal')
const c = require('../controllers')
const {
  aliasEndpoint
} = require('../endpoints')
const pkg = require('../../package.json')
const env = require('../env')

/** @lends create */
function create (config) {
  const {
    locales,
    db,
    mail,
    redisConfig = env.redis,
    sealConfig = env.seal
  } = config
  const seal = theSeal(sealConfig['SEAL_SECRET'])
  const app = {
    pkg,
    db,
    locales,
    seal,
    mail
  }
  const server = theServer({
    static: ['public'],
    redis: redisConfig,
    endpoints: {
      '/a/:key': aliasEndpoint
    },
    cacheDir: 'tmp/cache',
    injectors: {
      app: (ctx) => app,
      client: (ctx) => createClient(),
      store: (ctx) => createStore()
    },
    html: Html,
    langs: Object.keys(locales),
    scope: app
  })

  server.load(c.AppCtrl, 'app')
  server.load(c.SignCtrl, 'sign')
  server.load(c.VerifyCtrl, 'verify')
  server.load(c.RecoverCtrl, 'recover')
  server.load(c.AdminUsersCtrl, 'adminUsers')

  return server
}

module.exports = create
