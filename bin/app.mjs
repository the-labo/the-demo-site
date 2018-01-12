#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

import { server } from '../server'

import { isProduction } from 'the-check'
import Local from '../Local'

(async () => {
  const {port = Local.APP_PORT} = process.env

  function onListen () {
    console.log(`
  =============================
  
  Access to http://localhost:${Local.NGINX_PUBLISHED_PORT} in your browser
  
  =============================
  `)
  }

  if (isProduction()) {
    await server.listenAsCluster(port, onListen)
  } else {
    await server.listen(port, onListen)
  }
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
