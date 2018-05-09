#!/usr/bin/env node
/**
 * Do refactoring
 */
'use strict'

process.chdir(`${__dirname}/../..`)

const theRefactor = require('the-refactor').create
const refactor = theRefactor()

void async function () {
  refactor.rewrite([
    'client/ui/**/*Form.jsx'
  ], {
    '@withForm': '@formed',
    'getFormAttributes': 'formPropsOf',
    'getFormAttributesOf': 'formPropsOf',
    'getInputAttributesOf': 'inputPropsOf',
    'getLabelAttributesOf': 'labelPropsOf',
    'getSubmitAttributes': 'submitPropsOf',
    'getSubmitAttributesOf': 'submitPropsOf',
    'import { withForm } from \'the-components\'': 'import { formed } from \'the-component-mixins\'',
  })
}()
