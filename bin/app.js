#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

require('babel-polyfill')
const {server} = require('../server')
const {APP_PORT, NGINX_PUBLISHED_PORT} = require('../Local')

;(async () => {
  const {port = APP_PORT} = process.env
  await server.listen(port)
  console.log(`
  =============================
  
  Access to http://localhost:${NGINX_PUBLISHED_PORT} in your browser
  
  =============================
  `)
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
