/**
 * Config for e2e
 *
 */
'use strict'

const Local = require('../../Local')

module.exports = Object.freeze({
  baseUrl: `http://localhost:${Local.NGINX_CONTAINER_PORT}`
})