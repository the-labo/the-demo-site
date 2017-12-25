/**
 * Site Urls
 * @enum {string} Urls
 */
'use strict'

const pkg = require('../package.json')

module.exports = Object.freeze(
  /** @lends Urls */
  {

    TOP_URL: '/',

    ALIAS_URL: '/a/:key',

    ABOUT_APP_URL: '/about/app',
    ABOUT_PRIVACY_POLICY_URL: '/about/privacy-policy',
    ABOUT_TERMS_OF_USE_URL: '/about/terms-of-use',

    SIGNIN_URL: '/sign/signin',
    SIGNUP_URL: '/sign/signup',
    SIGNASK_URL: '/sign/please',
    SIGNOUT_URL: '/sign/signout',
    QUIT_URL: '/quit',

    ACCOUNT_MYPAGE_URL: '/account/mypage',
    ACCOUNT_PASSWORD_URL: '/account/password',
    ACCOUNT_PROFILE_URL: '/account/profile',

    VERIFY_CONFIRM_URL: '/verify/confirm',
    RECOVER_SEND_URL: '/recover/send',
    RECOVER_RESET_URL: '/recover/reset',

    ADMIN_URL: '/admin',
    USER_MANAGE_URL: '/admin/users',

    ICON_URL: '/icons/favicon.png',

    JS_BUNDLE_URL: '/build/bundle.js',
    JS_EXTERNAL_URL: '/build/external-bundle.js',

    CSS_THEME_URL: '/css/theme.css',
    CSS_FONT_URL: '/css/font-awesome.css',
    CSS_BUNDLE_URL: '/build/bundle.css',

    PRODUCTION_JS_URL: `/${pkg.name}-${pkg.version}.js`,
    PRODUCTION_CSS_URL: `/${pkg.name}-${pkg.version}.css`,

    ERROR_SERVER_ERROR_URL: '/errors/server-error',
    ERROR_NOTFOUND_URL: '/errors/not-found'
  }
)
