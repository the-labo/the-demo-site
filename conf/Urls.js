/**
 * Site Urls
 * @enum {string} Urls
 */
'use strict'

const { isProduction } = require('the-check')
const { hashProxy } = require('the-site-util')
const pkg = require('../package')

const prodAssetURL = `/v${pkg.version}`

module.exports = Object.freeze(
  /** @lends Urls */
  {

    // -----------------------------------
    // About
    // -----------------------------------
    ABOUT_APP_URL: '/about/app',
    ABOUT_PRIVACY_POLICY_URL: '/about/privacy-policy',
    ABOUT_TERMS_OF_USE_URL: '/about/terms-of-use',

    // -----------------------------------
    // Account
    // -----------------------------------
    ACCOUNT_MYPAGE_URL: '/account/mypage',
    ACCOUNT_PASSWORD_URL: '/account/password',
    ACCOUNT_PROFILE_URL: '/account/profile',
    ACCOUNT_QUIT_URL: '/account/quit',
    ACCOUNT_RECOVER_RESET_URL: '/account/recover/reset',
    ACCOUNT_RECOVER_URL: '/account/recover/send',
    ACCOUNT_VERIFY_URL: '/account/verify/confirm',

    // -----------------------------------
    // Admin
    // -----------------------------------
    ADMIN_URL: '/admin',
    ADMIN_USER_MANAGE_URL: '/admin/users',

    // -----------------------------------
    // Alias
    // -----------------------------------
    ALIAS_URL: '/a/:key',

    // -----------------------------------
    // Css
    // -----------------------------------
    CSS_BUNDLE_URL: '/build/bundle.css',
    CSS_FLATPICKR_URL: '/css/flatpickr.min.css',
    CSS_FONT_URL: '/css/fontawesome-all.css',
    CSS_NORMALIZE_URL: '/css/normalize.css',
    CSS_THEME_URL: '/css/theme.css',

    // -----------------------------------
    // Error
    // -----------------------------------
    ERROR_FORBIDDEN_URL: '/errors/forbidden',
    ERROR_NOTFOUND_URL: '/errors/not-found',

    // -----------------------------------
    // Icon
    // -----------------------------------
    ICON_URL: '/images/app-icon.png',

    // -----------------------------------
    // JS
    // -----------------------------------
    JS_BUNDLE_URL: '/build/bundle.js',
    JS_EXTERNAL_URL: '/build/external.js',
    JS_ROOT_SERVICE_WORKER_URL: '/RootServiceWorker.js',
    JS_SHIM_URL: '/js/es5-shim.min.js',

    // -----------------------------------
    // Manifest
    // -----------------------------------
    MANIFEST_URL: '/manifest/:lang/manifest.json',

    // -----------------------------------
    // Production
    // -----------------------------------
    PROD_ASSET_URL: prodAssetURL,
    PROD_CSS_BUNDLE_URL: `${prodAssetURL}/bundle.css`,
    PROD_JS_BUNDLE_URL: `${prodAssetURL}/bundle.js`,
    PROD_JS_EXTERNAL_URL: `${prodAssetURL}/external.js`,

    // -----------------------------------
    // Sign
    // -----------------------------------
    SIGN_ASK_URL: '/sign/please',
    SIGN_IN_URL: '/sign/signin',
    SIGN_OUT_URL: '/sign/signout',
    SIGN_UP_URL: '/sign/signup',

    // -----------------------------------
    // Top
    // -----------------------------------
    TOP_URL: '/',
  }
)

if (!isProduction()) {
  module.exports = hashProxy(module.exports, { name: 'Urls', unknownCheck: true })
}
