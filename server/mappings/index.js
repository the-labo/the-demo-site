/**
 * Module mappings
 * @module mappings
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const ControllerMapping = _d(require('./ControllerMapping'))
const HookMapping = _d(require('./HookMapping'))
const ResourceMapping = _d(require('./ResourceMapping'))
const ServiceMapping = _d(require('./ServiceMapping'))

module.exports = {
  ControllerMapping,
  HookMapping,
  ResourceMapping,
  ServiceMapping,
}
