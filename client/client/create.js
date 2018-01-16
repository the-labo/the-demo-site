/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const {TheClient} = require('the-client/shim')

const ClientBase = [].reduce((Clazz, mix) => mix(Clazz), TheClient)

class Client extends ClientBase {}

/** @lends create */
function create (config = {}) {
  return new Client(config)
}

create.for = (namespace, options = {}) => {
  const {
    handle: {cautionDisconnectedScene},
  } = options
  return Client.for(namespace, {
    onGone: () => cautionDisconnectedScene.set({busy: false, active: true})
  })
}

module.exports = create
