/**
 * Util for url
 * @module urlUtil
 */
'use strict'

const qs = require('qs')
const {formatUrl} = require('the-url')

/**
 * Resolve url
 * @param {string} url
 * @param {Object} params
 * @param {Object} [options={}] - Optional settings
 * @param {Object} [options.query={}] - Query string to add
 * @returns {string}
 */
function resolveUrl (url, params, options = {}) {
  let resolved = formatUrl(url, params)
  const {query} = options
  if (query) {
    const [withoutQs, currentQs] = resolved.split('?')
    const queryString = Object.assign({}, qs.parse(currentQs), query)
    resolved = `${withoutQs}?${qs.stringify(queryString)}`
  }
  return resolved
}

function queryFromSearch (search) {
  if (!search) {
    return {}
  }
  return qs.parse(search.replace(/^\?/, ''))
}

module.exports = {
  resolveUrl,
  queryFromSearch
}
