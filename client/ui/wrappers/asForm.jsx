/**
 * Wrapper for form
 * @function asForm
 */
'use strict'

import { withLoc } from 'the-loc'
import { withForm } from 'the-components'
import withCycle from './withCycle'
import asBound from './asBound'

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
