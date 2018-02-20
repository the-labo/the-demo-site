/**
 * Client a site client
 * @function create
 * @returns {TheClient} - A client instance
 */
'use strict'

const {TheClient} = require('the-client/shim')
const {unlessProduction} = require('the-check')

class Client extends TheClient {}

/** @lends create */
function create (config = {}) {
  return new Client(config)
}

create.for = (namespace, options = {}) => {
  const {
    handle: {connectionRetryScene},
  } = options
  const client = Client.for(namespace, {
    onGone: () => {
      connectionRetryScene.set({active: true, busy: false,})
      unlessProduction(() =>
        client.pingPongAnd(() => connectionRetryScene.doExec()),
      )
    }
  })
  return client
}

module.exports = create
