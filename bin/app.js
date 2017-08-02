#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

require('babel-polyfill')
const { server, env } = require('../server')
const { NGINX_PUBLISHED_PORT } = require('../misc/docker/Container')

;(async () => {
  const { port = env.port.APP } = process.env
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
