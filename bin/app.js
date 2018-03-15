#!/usr/bin/env node

/**
 * Run app
 */
'use strict'

const {server} = require('../server')

const {isProduction} = require('the-check')
const Local = require('../Local')

void async function () {
  const {port = Local.APP_PORT} = process.env

  function onListen () {
    console.log(`
  =============================
  
  Access in your browser
  http://localhost:${Local.NGINX_CONTAINER_PORT} 
  https://localhost:${Local.NGINX_CONTAINER_SECURE_PORT} 
  
  =============================
  `)
  }

  await server.listen(port, onListen)
}().catch((err) => {
  console.error(err)
  process.exit(1)
})
