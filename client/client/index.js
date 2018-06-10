/**
 * Client index
 * @module client
 */
'use strict'

const create = require('./create')
const handle = require('../handle')
const AppConsts = require('../constants/AppConsts')
const singleton = create.for('singleton', {handle, version: AppConsts.version})
module.exports = singleton
