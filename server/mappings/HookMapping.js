/**
 * Hook mapping
 * @namespace HookMapping
 */
'use strict'

const h = require('../db/hooks')

module.exports = Object.freeze({
  'User': h.UserHook,
})
