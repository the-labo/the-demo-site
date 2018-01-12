#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

import 'the-polyfill/apply'
import server from '../server/server'
import { theCheck } from 'the-check'
import Local from '../Local'

const {isProduction} = theCheck
const {APP_PORT, NGINX_PUBLISHED_PORT} = Local

;(async () => {
  const {port = APP_PORT} = process.env

  function onListen () {
    console.log(`
  =============================
  
  Access to http://localhost:${NGINX_PUBLISHED_PORT} in your browser
  
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
