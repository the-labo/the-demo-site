/**
 * Wrap controller with debug
 * @function withDebug
 */
'use strict'

const Debug = require('debug')
const {unlessProduction} = require('the-check')

/** @lends withDebug */
function withDebug (Class,
                    debugKey = `app:${Class.name}`,
                    contextFilter = (self) => self.client) {
  const debug = Debug(debugKey)
  const instanceMethods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(new Class())
  ).filter((name) => name !== 'constructor')

  class WithDebug extends Class {}

  unlessProduction(() => {
    for (let name of instanceMethods) {
      WithDebug.prototype[name] = async function debugProxy (...args) {
        const startAt = new Date()
        const res = await Class.prototype[name].apply(this, args)
        const took = new Date() - startAt
        debug(JSON.stringify({class: Class.name, method: name, args, took, context: contextFilter(this)}))
        return res
      }
    }
  })

  WithDebug.prototype._debug = debug
  return WithDebug
}

module.exports = withDebug
