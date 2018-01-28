/**
 * Site Urls
 * @enum {string} Urls
 */
'use strict'

const pkg = require('../package.json')

module.exports = Object.freeze(
  /** @lends Urls */
  {
    ABOUT_PRIVACY_POLICY_URL: '/about/privacy-policy',
    ABOUT_TERMS_OF_USE_URL: '/about/terms-of-use',
    ACCOUNT_PASSWORD_URL: '/account/password',

    ACCOUNT_PROFILE_URL: '/account/profile',
    ACCOUNT_QUIT_URL: '/account/quit',
    ACCOUNT_RECOVER_RESET_URL: '/account/recover/reset',
    ACCOUNT_RECOVER_URL: '/account/recover/send',
    ACCOUNT_VERIFY_URL: 'account/verify/confirm',
    ADMIN_USER_MANAGE_URL: '/admin/users',
    CSS_FONT_URL: '/css/fontawesome-all.css',

    CSS_THEME_URL: '/css/theme.css',
    ERROR_NOTFOUND_URL: '/errors/not-found',

    JS_EXTERNAL_URL: '/build/external-bundle.js',

    PRODUCTION_JS_URL: `/${pkg.name}-${pkg.version}.js`,
    SIGNIN_URL: '/sign/signin',
    SIGNOUT_URL: '/sign/signout',

    SIGNUP_URL: '/sign/signup',

    // ---------------------------------
    // About
    // ---------------------------------
    ABOUT_APP_URL: '/about/app',

    // ---------------------------------
    // Account
    // ---------------------------------
    ACCOUNT_MYPAGE_URL: '/account/mypage',

    // ---------------------------------
    // Admin
    // ---------------------------------
    ADMIN_URL: '/admin',

    // ---------------------------------
    // Alias
    // ---------------------------------
    ALIAS_URL: '/a/:key',

    // ---------------------------------
    // Css
    // ---------------------------------
    CSS_BUNDLE_URL: '/build/bundle.css',

    // ---------------------------------
    // Error
    // ---------------------------------
    ERROR_FORBIDDEN_URL: '/errors/forbidden',

    // ---------------------------------
    // Icon
    // ---------------------------------
    ICON_URL: '/images/app-icon.png',

    // ---------------------------------
    // JS
    // ---------------------------------
    JS_BUNDLE_URL: '/build/bundle.js',

    // ---------------------------------
    // Production
    // ---------------------------------
    PRODUCTION_CSS_URL: `/${pkg.name}-${pkg.version}.css`,

    // ---------------------------------
    // Sign
    // ---------------------------------
    SIGNASK_URL: '/sign/please',

    // ---------------------------------
    // Top
    // ---------------------------------
    TOP_URL: '/',
  }
)
