/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

const theServer = require('the-server')
const {Html} = require('@self/client/shim/ui')
const {createClient, createStore, createHandle} = require('@self/client/shim')
const theSeal = require('the-seal')
const endpoints = require('../endpoints')
const pkg = require('../../package.json')
const {servicesProxy} = require('the-service-base')
const env = require('../env')
const {ControllerMapping, ServiceMapping} = require('../mappings')
const {isProduction} = require('the-check')

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
    mail,
    services: servicesProxy(ServiceMapping, db)
  }

  const server = theServer({
    static: isProduction() ? [] : ['public'],
    redis: redisConfig,
    endpoints,
    cacheDir: 'tmp/cache',
    injectors: {
      app: (ctx) => app,
      client: (ctx) => createClient(),
      store: (ctx) => createStore(),
      handle: (ctx) => createHandle()
    },
    html: Html,
    langs: Object.keys(locales),
    scope: app
  })

  for (const [name, Controller] of Object.entries(ControllerMapping)) {
    server.load(Controller, name)
  }

  return server
}

module.exports = create
