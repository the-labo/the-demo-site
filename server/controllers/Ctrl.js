/**
 * @abstract
 * @class Ctrl
 */
const {TheCtrl} = require('the-controller-base')

/** @lends Ctrl */
class Ctrl extends TheCtrl {
  get resources () {
    const s = this
    return s.app.db.resources
  }
}

module.exports = Ctrl