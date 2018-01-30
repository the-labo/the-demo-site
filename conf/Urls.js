/**
 * Site Urls
 * @enum {string} Urls
 */
'use strict'

const pkg = require('../package.json')

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
    ACCOUNT_VERIFY_URL: 'account/verify/confirm',

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
    CSS_FONT_URL: '/css/fontawesome-all.css',
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
    JS_EXTERNAL_URL: '/build/external-bundle.js',

    // -----------------------------------
    // Production
    // -----------------------------------
    PRODUCTION_CSS_URL: `/${pkg.name}-${pkg.version}.css`,
    PRODUCTION_JS_URL: `/${pkg.name}-${pkg.version}.js`,

    // -----------------------------------
    // Sign
    // -----------------------------------
    SIGNASK_URL: '/sign/please',
    SIGNIN_URL: '/sign/signin',
    SIGNOUT_URL: '/sign/signout',
    SIGNUP_URL: '/sign/signup',

    // -----------------------------------
    // Top
    // -----------------------------------
    TOP_URL: '/',
  }
)
