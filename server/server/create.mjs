/**
 * Create an server instance
 * @function create
 * @returns {TheServer}
 */
'use strict'

import theServer from 'the-server'
import { Html } from '@self/client/shim/ui'
import client from '@self/client/shim'
import theSeal from 'the-seal'
import endpoints from '../endpoints'
import pkg from '../../package.json'
import theServiceBase from 'the-service-base'
import env from '../env'
import mappings from '../mappings'
import theCheck from 'the-check'

const {servicesProxy} = theServiceBase
const {ControllerMapping, ServiceMapping} = mappings
const {isProduction} = theCheck
const {createClient, createStore, createHandle} = client

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
