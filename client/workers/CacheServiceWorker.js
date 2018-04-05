/**
 * @file ServiceWorker
 */
'use strict'

const {Urls} = require('@self/conf')
const {isProduction} = require('the-check')
const {parse: parseUrl} = require('url')
const {AppConsts} = require('../constants')
const {appCache, cachingFetch} = require('the-sw-util')

const filesToCache = [
  ...(
    isProduction() ? [
      Urls.PRODUCTION_CSS_URL,
      Urls.PRODUCTION_JS_URL,
    ] : [
      Urls.JS_BUNDLE_URL,
      Urls.JS_EXTERNAL_URL,
      Urls.CSS_BUNDLE_URL,
      Urls.CSS_FONT_URL,
      Urls.CSS_NORMALIZE_URL,
      Urls.CSS_THEME_URL,
    ]
  ),
  Urls.ICON_URL,
]

const patternsToCache = [
  /^\/webfonts\//
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    async function () {
    }()
  )
})

self.addEventListener('fetch', (event) => {
  const {pathname} = parseUrl(event.request.url)
  const shouldCache = filesToCache.includes(pathname) || patternsToCache.some((pattern) => pattern.test(pathname))
  if (!shouldCache) {
    return
  }

  event.respondWith(
    async function () {
      const cache = await appCache(AppConsts.name, AppConsts.version, {
        scope: 'static-files',
      })
      return cachingFetch(cache, event.request)
    }()
  )
})
