/**
 * Route for upload
 * @function uploadRoute
 */
'use strict'

const {theUploadRouteFor} = require('the-site-routes')
const Local = require('@self/Local')
const path = require('path')
const moment = require('moment')

/** @lends uploadRoute */
async function uploadRoute (ctx) {
  const {
    app: {db},
  } = ctx
  const {Alias} = db.resources

  const route = theUploadRouteFor({
    async toUrl (filename) {
      const fullUrl = path.resolve(Local.PUBLIC_DIR, filename)
      const alias = Alias.ofUrl(fullUrl)
      return alias.pathname
    },
    saveTo: path.resolve(Local.PUBLIC_DIR, 'uploaded', moment(new Date()).format('YYYY/MM')),
  })
  await route(ctx)
}

module.exports = uploadRoute
