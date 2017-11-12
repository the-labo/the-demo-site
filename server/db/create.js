/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theDB = require('the-db')
const env = require('../env')
const {ResourceMapping} = require('../mappings')

/** @lends create */
function create (config = env.database) {
  const db = theDB(config)

  for (const [as, Resource] of Object.entries(ResourceMapping)) {
    db.load(Resource, as)
  }

  return db
}

module.exports = create
