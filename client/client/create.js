/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const {TheClient} = require('the-client/shim')
const {get} = require('the-window')

const ClientBase = [].reduce((Clazz, mix) => mix(Clazz), TheClient)

class Client extends ClientBase {}

/** @lends create */
function create (config = {}) {
  const client = new Client(config)
  client.on('error', (e) => {
    switch (e.name) {
      case 'ServerRottenError': {
        const location = get('window.location')
        location && location.reload()
        break
      }
      default:
        break
    }
  })
  return client
}

create.for = (namespace, config) => {
  const client = Client.for(namespace, config)
  console.log(`client created for ${namespace}, with scope:`, client.scope)
  return client
}

module.exports = create
