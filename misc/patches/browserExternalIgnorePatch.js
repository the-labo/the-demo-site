/**
 * Patch for ignore on ui:browser-external
 * @function browserExternalIgnorePatch
 */
'use strict'

module.exports = ({isProduction}) => [
  ...(isProduction() ? [
    require.resolve('react/cjs/react.development.js'),
    require.resolve('react-dom/cjs/react-dom.development.js'),
    require.resolve('react-dom/cjs/react-dom-server.browser.development.js')
  ] : [
    require.resolve('react/cjs/react.production.min.js'),
    require.resolve('react-dom/cjs/react-dom.production.min.js'),
    require.resolve('react-dom/cjs/react-dom-server.browser.production.min.js')
  ])
]