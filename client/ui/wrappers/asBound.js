'use strict'

import { inject } from 'the-handle'
import { connect } from 'the-store'

function asBound (Component,
                  mapStateToProps = () => ({}),
                  mapHandleToProps = () => ({})) {
  return [
    inject(mapHandleToProps),
    connect(mapStateToProps)
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asBound
