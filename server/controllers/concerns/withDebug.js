/**
 * Wrap controller with debug
 * @function withDebug
 */
'use strict'

const Debug = require('debug')

/** @lends withDebug */
function withDebug (Class,
                    debugKey = `app:${Class.name}`,
                    contextFilter = ({app, client, session}) => ({session})) {
  const debug = Debug(debugKey)
  const instanceMethods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(new Class())
  ).filter((name) => name !== 'constructor')

  class WithDebug extends Class {}

  for (let name of instanceMethods) {
    WithDebug.prototype[name] = function (...args) {
      const self = this
      const res = Class.prototype[name].apply(self, args)
      debug(JSON.stringify({class: Class.name, method: name, args, context: contextFilter(self)}))
      return res
    }
  }
  return WithDebug
}

module.exports = withDebug
