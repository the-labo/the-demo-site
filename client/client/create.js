/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const { TheClient } = require('the-client/shim')

const ClientBase = [].reduce((Clazz, mix) => mix(Clazz), TheClient)

class Client extends ClientBase {}

/** @lends create */
function create (config = {}) {
  const client = new Client(config)
  return client
}

create.for = (namespace, config) => {
  let client = Client.for(namespace, config)
  console.log(`client created for ${namespace}, with scope:`, client.scope)
  return client
}

module.exports = create
