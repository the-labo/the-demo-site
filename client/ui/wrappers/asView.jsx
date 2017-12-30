'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { withClient } from 'the-client/shim'
import { withHistory, withRoute } from 'the-components'
import withCycle from './withCycle'
import withTitle from './withTitle'
import asBound from './asBound'
import { get } from 'the-window'
import onlySigned from './onlySigned'

function asView (Component,
                 mapStateToProps,
                 mapHandleToProps,
                 options = {}) {

  class ViewWrap extends React.Component {
    render () {
      const s = this
      return <Component {...s.props}
                        pathname={get('location.pathname')}
      />
    }

  }

  return [
    (Component) => withTitle(Component, (props) => {
      const {l} = props
      const title = options.title && options.title(props)
      const appName = l('app.APP_NAME')
      return title ? `${title} | ${appName}` : appName

    }),
    withCycle,
    (Component) => asBound(Component, mapStateToProps, mapHandleToProps),
    options.onlySigned && onlySigned,
    withLoc,
    withHistory,
    withRoute,
    withClient
  ]
    .filter(Boolean)
    .reduce(
      (Component, wrapper) => wrapper(Component),
      ViewWrap
    )

}

export default asView
