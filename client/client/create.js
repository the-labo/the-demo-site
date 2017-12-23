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

function bindClientEvents (client) {
  client.on(TheClientEvents.SERVER_GONE, () => show(Urls.ERROR_SERVER_GONE_URL))
  client.on(TheClientEvents.SOCKET_GONE, () => show(Urls.ERROR_SERVER_GONE_URL))
}

/** @lends create */
function create (config = {}) {
  const client = new Client(config)
  bindClientEvents(client)
  return client
}

create.for = (namespace, config) => {
  const client = Client.for(namespace, config)
  bindClientEvents(client)
  return client
}

module.exports = create
