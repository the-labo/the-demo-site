/**
 * UI settings
 * @enum {string} UI
 */
'use strict'

module.exports = Object.freeze(
  /** @lends UI */
  {
    /** ID of container dom to mount React app */
    APP_CONTAINER_ID: 'app-container',
    /** Global variable name to store app stage */
    APP_STAGE_NAME: 'appStage',
    /** Global variable name to store app props */
    APP_PROP_NAME: 'appProps',
    /** NPM packages to bundle as external */
    EXTERNAL_BUNDLES: 'react,react-dom,react-dom/server,react-router-dom,react-transition-group,' +
    'redux,react-redux,prop-types,classnames,fbjs,' +
    'core-js,core-js/shim,core-js/library,' +
    'abind,asleep,argx,asobj,qs,objnest,' +
    'the-scene-base,the-date,the-url,the-error,the-store,the-check,the-client,the-scope,the-window,the-components,the-loc',
    /** Toast duration */
    TOAST_DURATION: 2000,

    DEFAULT_LANG: 'en'
  }
)
