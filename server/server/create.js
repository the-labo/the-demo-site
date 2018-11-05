/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

const { isProduction } = require('the-check')
const theSeal = require('the-seal')
const theServer = require('the-server')
const { servicesProxy } = require('the-service-base')
const { Html, createClient, createHandle, createStore } = require('@self/client/shim')
const Local = require('@self/Local')
const endpoints = require('../endpoints')
const env = require('../env')
const mappings = require('../mappings')
const conf = require('../../conf')
const pkg = require('../../package')

const { ControllerMapping, ServiceMapping } = mappings

/** @lends create */
function create (config) {
  const {
    db,
    locales = conf.locales,
    mail,
    redisConfig = env.redis,
    sealConfig = env.seal,
  } = config
  const seal = theSeal(sealConfig['SEAL_SECRET'])

  const app = {
    buildNumber: String(new Date().getTime()),
    cdnUrl: isProduction() ? Local.APP_CDN_URL : null,
    db,
    locales,
    mail,
    seal,
    services: servicesProxy(ServiceMapping, db),
    version: pkg.version,
  }

  const server = theServer({
    cacheDir: 'tmp/cache',
    controllers: ControllerMapping,
    endpoints,
    html: Html,
    injectors: {
      app: (ctx) => app,
      client: (ctx) => createClient(),
      handle: (ctx) => createHandle(),
      info: (ctx) => server.info(),
      store: (ctx) => createStore(),
    },
    langs: Object.keys(locales),
    redis: redisConfig,
    scope: app,
    static: isProduction() ? [] : [Local.PUBLIC_DIR],
  })
  return server
}

module.exports = create
