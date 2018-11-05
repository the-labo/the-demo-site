/**
 * Drawing configurations
 * @namespace Drawings
 */
'use strict'

const { Styles } = require('../../conf')
const Local = require('../../Local')
const pkg = require('../../package')

const FONT_THEME = 'a'

module.exports = Object.freeze(
  /** @lends Drawings */
  {
    appIcon: {
      data: {
        color: Styles.DOMINANT_COLOR,
        font: FONT_THEME,
        shape: 'b',
        text: pkg.name[0],
      },
      path: 'assets/images/app-icon.png',
    },
    fbAppIcon: {
      data: {
        color: Styles.DOMINANT_COLOR,
        font: FONT_THEME,
        fontSize: 128,
        shape: 'a',
        size: 1024,
        text: pkg.name,
      },
      path: 'assets/images/fb/fb-app-icon.png',
    },
    officialAccountIcon: {
      data: {
        color: Styles.DOMINANT_COLOR,
        font: FONT_THEME,
        fontSize: 24,
        shape: 'a',
        size: 256,
        text: pkg.name,
      },
      path: 'assets/images/accounts/official-account-icon.png',
    },
  }
)
