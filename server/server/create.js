/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

const theServer = require('the-server').default
const theSeal = require('the-seal').default
const endpoints = require('../endpoints')
const pkg = require('../../package.json')
const {servicesProxy} = require('the-service-base')
const env = require('../env')
const mappings = require('../mappings')
const {isProduction} = require('the-check')
const Local = require('@self/Local')
const {Html, createClient, createHandle, createStore,} = require('@self/client/shim')

const {ControllerMapping, ServiceMapping,} = mappings

/** @lends create */
function create (config) {
  const {
    db,
    locales,
    mail,
    redisConfig = env.redis,
    sealConfig = env.seal,
  } = config
  const seal = theSeal(sealConfig['SEAL_SECRET'])

  const app = {
    cdnUrl: isProduction() ? Local.APP_CDN_URL : null,
    db,
    locales,
    mail,
    seal,
    services: servicesProxy(ServiceMapping, db),
    version: isProduction() ? pkg.version : String(new Date().getTime()),
  }

  return theServer({
    cacheDir: 'tmp/cache',
    controllers: ControllerMapping,
    endpoints,
    html: Html,
    injectors: {
      app: (ctx) => app,
      client: (ctx) => createClient(),
      handle: (ctx) => createHandle(),
      store: (ctx) => createStore(),
    },
    langs: Object.keys(locales),
    redis: redisConfig,
    scope: app,
    static: isProduction() ? [] : [Local.PUBLIC_DIR],
  })
}

module.exports = create
