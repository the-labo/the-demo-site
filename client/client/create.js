/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const {TheClient} = require('the-client/shim')
const {Events: TheClientEvents} = TheClient

const ClientBase = [].reduce((Clazz, mix) => mix(Clazz), TheClient)

class Client extends ClientBase {}

/** @lends create */
function create (config = {}) {
  return new Client(config)
}

create.for = (namespace, options = {}) => {
  const {
    handle: {cautionDisconnectedScene}
  } = options
  const client = Client.for(namespace, {})
  const handleGone = () => cautionDisconnectedScene.set({active: true})
  client.on(TheClientEvents.SOCKET_GONE, handleGone)
  client.on(TheClientEvents.SERVER_GONE, handleGone)
  return client
}

module.exports = create
