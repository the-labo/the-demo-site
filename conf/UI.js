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
    /** Global variable name for app */
    GLOBAL_KEY: 'app',
    /** Global variable name for app stage */
    GLOBAL_KEY_STAGE: 'app.stage',
    /** Global variable name for app props */
    GLOBAL_KEY_PROPS: 'app.props',
    /** Global variable name for app handle */
    GLOBAL_KEY_HANDLE: 'app.handle',
    /** Global variable name for app store */
    GLOBAL_KEY_STORE: 'app.store',
    /** NPM packages to bundle as external */
    EXTERNAL_BUNDLES: 'react,react-dom,react-dom/server,react-router-dom,react-transition-group,' +
    'redux,react-redux,prop-types,classnames,fbjs,' +
    'core-js,core-js/shim,core-js/library,' +
    'abind,asleep,argx,qs,objnest,asobj,' +
    'the-scene-base,the-date,the-url,the-error,the-store,the-check,the-client,the-scope,the-window,the-components,the-loc,the-site-components,the-site-util',
    /** Toast duration */
    TOAST_DURATION: 2000,

    DEFAULT_LANG: 'en'
  }
)
