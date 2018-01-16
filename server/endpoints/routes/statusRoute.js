/**
 * Route for status
 * @function statusRoute
 */
'use strict'

/** @lends statusRoute */
async function statusRoute (ctx) {
  ctx.body = {
    alive: true
  }
}

module.exports = statusRoute