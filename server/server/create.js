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
const {createClient, createStore, createHandle, Html} = require('@self/client/shim')

const {ServiceMapping, ControllerMapping,} = mappings

/** @lends create */
function create (config) {
  const {
    locales,
    db,
    mail,
    redisConfig = env.redis,
    sealConfig = env.seal,
  } = config
  const seal = theSeal(sealConfig['SEAL_SECRET'])

  const app = {
    db,
    locales,
    seal,
    mail,
    services: servicesProxy(ServiceMapping, db),
    version: isProduction() ? pkg.version : String(new Date().getTime()),
    cdnUrl: isProduction() ? Local.APP_CDN_URL : null,
  }

  return theServer({
    static: isProduction() ? [] : [Local.PUBLIC_DIR],
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
    scope: app,
    controllers: ControllerMapping
  })
}

module.exports = create
