/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

import theServer from 'the-server'
import theSeal from 'the-seal'
import endpoints from '../endpoints'
import pkg from '../../package.json'
import { servicesProxy } from 'the-service-base'
import env from '../env'
import mappings from '../mappings'
import { isProduction } from 'the-check'
import client from '@self/client/shim'

const {ServiceMapping, ControllerMapping,} = mappings

const {
  createClient,
  createStore,
  createHandle,
  ui: {Html},
} = client

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
    pkg,
    db,
    locales,
    seal,
    mail,
    services: servicesProxy(ServiceMapping, db),
  }

  return theServer({
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
    scope: app,
    controllers: ControllerMapping
  })
}

export default create
