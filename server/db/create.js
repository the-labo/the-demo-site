/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const cluster = require('cluster')
const theDB = require('the-db')
const env = require('../env')
const {HookMapping, PluginMapping, ResourceMapping} = require('../mappings')

/** @lends create */
function create (config = env.database, options = {}) {
  const {
    enableHooks = cluster.isMaster,
  } = options

  return theDB({
    hooks: enableHooks ? HookMapping : null,
    plugins: PluginMapping,
    resources: ResourceMapping,
    ...config,
  }).unref()
}

create.forTask = () => create(env.database, {enableHooks: false})

module.exports = create
