/**
 * Wrapper for form
 * @function asForm
 */
'use strict'

import { localized } from 'the-component-mixins'
import { withForm } from 'the-components'
import { asBound, withCycle } from 'the-hoc'

/** @lends asForm */
function asForm (Component,
                 mapStateToProps,
                 mapHandleToProps) {
  return [
    localized,
    withCycle,
    withForm,
    (Component) => asBound(Component, mapStateToProps, mapHandleToProps)
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asForm
