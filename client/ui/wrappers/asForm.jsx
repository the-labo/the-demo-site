/**
 * Wrapper for form
 * @function asForm
 */
'use strict'

import { withForm } from 'the-components'
import { asBound, withCycle } from 'the-hoc'
import { withLoc } from 'the-loc'

/** @lends asForm */
function asForm (Component,
                 mapStateToProps,
                 mapHandleToProps) {
  return [
    withLoc,
    withCycle,
    withForm,
    (Component) => asBound(Component, mapStateToProps, mapHandleToProps)
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asForm
