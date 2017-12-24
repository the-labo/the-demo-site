/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const {TheClient} = require('the-client/shim')
const {show} = require('the-window')
const {Urls} = require('@self/conf')
const {Events: TheClientEvents} = TheClient

const ClientBase = [].reduce((Clazz, mix) => mix(Clazz), TheClient)

class Client extends ClientBase {}

/** @lends create */
function create (config = {}) {
  const client = new Client(config)
  return client
}

create.for = (namespace, options = {}) => {
  const {
    handle: {cautionDisconnectedScene}
  } = options
  const client = Client.for(namespace, {})
  client.on(TheClientEvents.SOCKET_GONE, () => cautionDisconnectedScene.set({active: true}))
  return client
}

module.exports = create
