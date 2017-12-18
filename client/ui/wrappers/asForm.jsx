/**
 * Wrapper for form
 * @function asForm
 */
'use strict'

import { withLoc } from 'the-loc'
import { withForm } from 'the-components'
import withCycle from './withCycle'

/** @lends asForm */
function asForm (Component) {
  return [
    withLoc,
    withCycle,
    withForm
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asForm
