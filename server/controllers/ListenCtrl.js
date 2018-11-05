/**
 * ListenCtrl
 * @class ListenCtrl
 */
'use strict'

const { compose, withListen } = require('the-controller-mixins')
const Ctrl = require('./Ctrl')

const ListenCtrlBase = compose(
  withListen
)(Ctrl)

/** @lends ListenCtrl */
class ListenCtrl extends ListenCtrlBase {
}

module.exports = ListenCtrl
