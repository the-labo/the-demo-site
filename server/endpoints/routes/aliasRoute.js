/**
 * Route for alias
 * @function aliasRoute
 */
'use strict'

const debug = require('debug')('app:endpoint:alias')
const theCache = require('the-cache')

const cache = theCache({
  max: 1000 * 2,
  maxAge: 1000 * 60 * 6
})

/** @lends aliasRoute */
async function aliasRoute (ctx) {
  const {
    app: {db},
    params: {key}
  } = ctx
  const {Alias} = db.resources
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

module.exports = aliasRoute
