#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

require('babel-polyfill')

const {server} = require('../server')
const {isProduction} = require('the-check')
const {APP_PORT, NGINX_PUBLISHED_PORT} = require('../Local')

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
