/**
 * @file ServiceWorker
 */
'use strict'

const {Urls} = require('@self/conf')
const {isProduction} = require('the-check')
const {parse: parseUrl} = require('url')
const pkg = require('../../package') // TODO Hide info from browserify

const STATIC_FILES_CACHE_NAME = [
  pkg.name, pkg.version, 'static-files'
].join('-')

const staticFilePathnames = [
  ...(
    isProduction() ? [
      Urls.PRODUCTION_CSS_URL,
      Urls.PRODUCTION_JS_URL,
    ] : [
      // Urls.JS_BUNDLE_URL,
      Urls.JS_EXTERNAL_URL,
      // Urls.CSS_BUNDLE_URL,
      Urls.CSS_FONT_URL,
      Urls.CSS_NORMALIZE_URL,
      Urls.CSS_THEME_URL,
    ]
  ),
  Urls.ICON_URL,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    async function () {
    }()
  )
})

self.addEventListener('fetch', (event) => {
  const {method, url} = event.request
  const {pathname, search} = parseUrl(url)
  const shouldCache = staticFilePathnames.includes(pathname)
  if (!shouldCache) {
    return
  }

  event.respondWith(
    async function () {
      const cache = await caches.open(STATIC_FILES_CACHE_NAME)
      const cached = await cache.match(event.request)
      if (cached) {
        return cached
      }
      const fetched = await fetch(event.request)
      await cache.put(event.request, fetched.clone())
      return fetched
    }()
  )
})
