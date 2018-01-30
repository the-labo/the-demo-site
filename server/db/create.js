/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const cluster = require('cluster')
const env = require('../env')
const {HookMapping, ResourceMapping,} = require('../mappings')
const theDB = require('the-db').default

/** @lends create */
function create (config = env.database, options = {}) {
  const {
    enableHooks = cluster.isMaster,
  } = options

  return theDB({
    hooks: enableHooks ? HookMapping : null,
    resources: ResourceMapping,
    ...config,
  }).unref()
}

create.forTask = () => create(env.database, {enableHooks: false,})

module.exports = create
