'use strict'

import theHandle from 'the-handle'
import theStore from 'the-store'

const {inject} = theHandle
const {connect} = theStore

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
