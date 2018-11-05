/**
 * Route for alias
 * @function aliasRoute
 */
'use strict'

const { theAliasRouteFor } = require('the-site-routes')

/** @lends aliasRoute */
async function aliasRoute (ctx) {
  const {
    app: { db },
    params: { key },
  } = ctx
  const { Alias } = db.resources
  const route = theAliasRouteFor({ Alias, key })
  await route(ctx)
}

module.exports = aliasRoute
