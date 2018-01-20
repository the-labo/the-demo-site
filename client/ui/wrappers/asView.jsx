'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { withTitle, withCycle, asBound } from 'the-hoc'
import { withHistory, withRoute } from 'the-components'
import onlySigned from './onlySigned'

function asView (Component,
                 mapStateToProps,
                 mapHandleToProps,
                 options = {}) {

  class ViewWrap extends React.Component {
    render () {
      return <Component {...this.props} />
    }

  }

  return [
    (Component) => withTitle(Component, (props) => {
      const {l} = props
      const title = options.title?.call(null, props)
      const appName = l('app.APP_NAME')
      return title ? `${title} | ${appName}` : appName

    }),
    withCycle,
    (Component) => asBound(Component, mapStateToProps, mapHandleToProps),
    options.onlySigned && onlySigned,
    withLoc,
    withHistory,
    withRoute,
  ]
    .filter(Boolean)
    .reduce(
      (Component, wrapper) => wrapper(Component),
      ViewWrap
    )

}

export default asView
