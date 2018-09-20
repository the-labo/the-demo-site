#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

require('the-polyfill/apply')
const {server} = require('../server')

const {isProduction} = require('the-check')
const Local = require('../Local')

void async function () {
  const {port = Local.APP_PORT} = process.env

  await server.listen(port)
  console.log(`
  =============================
  Access in your browser
  
  HTTP -> http://localhost:${Local.NGINX_CONTAINER_PORT}
  
  =============================
  `)

}().catch((err) => {
  console.error(err)
  process.exit(1)
})
