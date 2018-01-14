/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theDB = require('the-db').default
const env = require('../env')
const {ResourceMapping, HookMapping} = require('../mappings')
const cluster = require('cluster')

/** @lends create */
function create (config = env.database, options = {}) {
  const {
    enableHooks = cluster.isMaster
  } = options

  return theDB({
    ...config,
    resources: ResourceMapping,
    hooks: enableHooks ? HookMapping : null
  }).unref()
}

create.forTask = () => create(env.database, {enableHooks: false})

module.exports = create
