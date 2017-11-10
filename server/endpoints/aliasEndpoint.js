/**
 * Endpoint for alias
 * @function aliasEndpoint
 */
'use strict'

const debug = require('debug')('app:endpoint:alias')
const LRU = require('lru-cache')

const cache = LRU({
  max: 1000 * 2,
  maxAge: 1000 * 60 * 6
})

/** @lends aliasEndpoint */
async function aliasEndpoint (ctx) {
  const {app} = ctx
  const {Alias} = app.db.resources
  const {key} = ctx.params
  const cached = cache.get(key)
  const found = cached || await Alias.first({key})
  if (!found) {
    ctx.status = 404
    ctx.body = `Unknown alias key: ${key}`
    return
  }
  if (!cached) {
    cache.set(key, found)
  }
  const {originalUrl} = found
  debug(`Redirect ${ctx.url} -> ${originalUrl} (Using cache: ${!!cached})`)
  ctx.redirect(originalUrl)
}

module.exports = aliasEndpoint
