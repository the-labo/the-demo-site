/**
 * Wrapper for form
 * @function asForm
 */
'use strict'

import { withLoc } from 'the-loc'
import { withForm } from 'the-components'

/** @lends asForm */
function asForm (Component) {
  return [
    withLoc,
    withForm
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asForm
