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
  
  Access to http://localhost:${Local.NGINX_CONTAINER_PORT} in your browser
  
  =============================
  `)
  }

  await server.listen(port, onListen)
}().catch((err) => {
  console.error(err)
  process.exit(1)
})
