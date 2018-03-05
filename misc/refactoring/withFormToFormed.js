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
    'import { withForm } from \'the-components\'': 'import { formed } from \'the-component-mixins\'',
    'getInputAttributesOf': 'inputPropsOf',
    'getFormAttributes': 'formPropsOf',
    'getFormAttributesOf': 'formPropsOf',
    'getLabelAttributesOf': 'labelPropsOf',
    'getSubmitAttributesOf': 'submitPropsOf',
    'getSubmitAttributes': 'submitPropsOf',
  })
}()