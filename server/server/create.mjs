/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

import theServer from 'the-server'
import theSeal from 'the-seal'

import client from '@self/client/shim'
import endpoints from '../endpoints'
import pkg from '../../package.json'
import { servicesProxy } from 'the-service-base'
import env from '../env'
import mappings from '../mappings'
import { isProduction } from 'the-check'

const {
  createClient,
  createStore,
  createHandle,
  ui: {Html}
} = client

const {ControllerMapping, ServiceMapping} = mappings

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

export default create
