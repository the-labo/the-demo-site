'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { withClient } from 'the-client/shim'
import { withHistory, withRoute } from 'the-components'
import { connect, withStore } from 'the-store'
import { inject } from 'the-handle'
import { get } from 'the-window'

function asView (Component,
                 mapStateToProps = () => ({}),
                 mapHandleToProps = () => ({})) {
  class ViewWrap extends React.Component {
    render () {
      const s = this

      return <Component {...props}
                        pathname={get('location.pathname')}
      />
    }
  }

  return [
    connect(mapStateToProps),
    inject(mapHandleToProps),
    withLoc,
    withStore,
    withHistory,
    withRoute,
    withClient
  ].reduce(
    (Component, wrapper) => wrapper(Component),
    ViewWrap
  )

}

export default asView
