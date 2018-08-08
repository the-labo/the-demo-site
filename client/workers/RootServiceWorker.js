/**
 * Service worker for root scope
 * @file RootServiceWorker
 */
'use strict'

const Urls = require('@self/conf/Urls')
const SrcSets = require('@self/conf/SrcSets')
const {parse: parseUrl} = require('url')
const {AppConsts} = require('../constants')
const {appCache, cachingFetch} = require('the-sw-util')

const pathsToCache = [
  ...SrcSets.jsSet,
  ...SrcSets.cssSet,
  Urls.ICON_URL,
]
const urlsToCache = []
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
  const {url} = event.request
  const {pathname, host} = parseUrl(url)
  const isOwn = host === location.host
  const shouldCache = urlsToCache.includes(url) ||
    (isOwn && pathsToCache.includes(pathname) || patternsToCache.some((pattern) => pattern.test(pathname)))
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
