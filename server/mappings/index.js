/**
 * Module mappings
 * @module mappings
 */
'use strict'

const ControllerMapping = require('./ControllerMapping')
const ResourceMapping = require('./ResourceMapping')
const ServiceMapping = require('./ServiceMapping')

module.exports = {
  ControllerMapping,
  ResourceMapping,
  ServiceMapping
}

exports.ControllerMapping = ControllerMapping
exports.ResourceMapping = ResourceMapping
exports.ServiceMapping = ServiceMapping
