'use strict'

const create = require('./create')
const handle = require('../handle')
const singleton = create.for('singleton', {handle})
module.exports = singleton
