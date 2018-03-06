/**
 * Config for e2e
 * @enum E2EConfig
 */
'use strict'

const Local = require('../../Local')

module.exports = Object.freeze(
  /** @lends E2EConfig */
  {
    baseUrl: `http://localhost:${Local.NGINX_CONTAINER_PORT}`,
    port: Local.E2E_PORT,
    screenshotPath: 'var/e2e/screenshots',
  }
)
