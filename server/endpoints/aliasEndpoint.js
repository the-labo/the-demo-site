/**
 * Define alias endpoint
 * @function aliasEndpoint
 */
'use strict'

const debug = require('debug')('app:endpoint:alias')

/** @lends aliasEndpoint */
async function aliasEndpoint (ctx) {
  const {app} = ctx
  const {Alias} = app.db.resources
  const {key} = ctx.params
  const found = await Alias.first({key})
  if (!found) {
    ctx.status = 404
    ctx.body = `Unknown alias key: ${key}`
    return
  }
  const {originalUrl} = found
  debug(`Redirect ${ctx.url} -> ${originalUrl}`)
  ctx.redirect(originalUrl)
}

module.exports = aliasEndpoint
