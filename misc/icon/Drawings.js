/**
 * Drawing configurations
 * @namespace Drawings
 */
'use strict'

const Local = require('../../Local')
const pkg = require('../../package')
const {Styles} = require('../../conf')

const FONT_THEME = 'a'

module.exports = Object.freeze(
  /** @lends Drawings */
  {
    appIcon: {
      path: 'assets/images/app-icon.png',
      data: {
        text: pkg.name[0],
        font: FONT_THEME,
        shape: 'b',
        color: Styles.DOMINANT_COLOR
      }
    },
    fbAppIcon: {
      path: 'assets/images/fb/fb-app-icon.png',
      data: {
        text: pkg.name,
        font: FONT_THEME,
        shape: 'a',
        color: Styles.DOMINANT_COLOR,
        size: 1024,
        fontSize: 128
      },
    },
    officialAccountIcon: {
      path: 'assets/images/accounts/official-account-icon.png',
      data: {
        text: pkg.name,
        font: FONT_THEME,
        shape: 'a',
        color: Styles.DOMINANT_COLOR,
        size: 256,
        fontSize: 24
      },
    }
  }
)