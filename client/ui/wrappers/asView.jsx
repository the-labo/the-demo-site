'use strict'

import { withLoc } from 'the-loc'
import { withClient } from 'the-client'
import { withHistory, withRoute } from 'the-components'
import { connect, withStore } from 'the-store'

function asView (Component, mapStateToProps) {
  return [
    connect(mapStateToProps),
    withLoc,
    withStore,
    withHistory,
    withRoute,
    withClient
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    Component
  )
}

export default asView
