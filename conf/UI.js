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
    EXTERNAL_BUNDLES: ['react', 'react-dom', 'the-components', 'the-site-components'],
    /** Toast duration */
    TOAST_DURATION: 2000,

    DEFAULT_LANG: 'en'
  }
)
