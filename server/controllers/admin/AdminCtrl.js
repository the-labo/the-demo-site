/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const {withAdmin, withSigned} = require('../concerns')

/** @lends AdminCtrl */
class AdminCtrl extends TheCtrl {
}

module.exports = withSigned(
  withAdmin(
    AdminCtrl
  )
)
