/**
 * Route for upload
 * @function uploadRoute
 */
'use strict'

const moment = require('moment')
const path = require('path')
const { theUploadRouteFor } = require('the-site-routes')
const Local = require('@self/Local')

/** @lends uploadRoute */
async function uploadRoute (ctx) {
  const {
    app: { db },
  } = ctx
  const { Alias } = db.resources

  const route = theUploadRouteFor({
    saveTo: path.resolve(Local.PUBLIC_DIR, 'uploaded', moment(new Date()).format('YYYY/MM')),
    async toUrl (filename) {
      const fullUrl = path.resolve(Local.PUBLIC_DIR, filename)
      const alias = Alias.ofUrl(fullUrl)
      return alias.pathname
    },
  })
  await route(ctx)
}

module.exports = uploadRoute
