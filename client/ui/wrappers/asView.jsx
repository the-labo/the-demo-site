'use strict'

import Debug from 'debug'
import React from 'react'
import { localized } from 'the-component-mixins'
import { withHistory, withRoute } from 'the-components'
import { asBound, withCycle, withTitle } from 'the-hoc'
import onlySigned from './onlySigned'

const debug = Debug('app:view')

function asView (Component,
                 mapStateToProps,
                 mapHandleToProps,
                 options = {}) {
  const name = Component.displayName || Component.name

  class ViewWrap extends React.Component {
    componentDidMount () {
      debug('mount', name)
    }

    componentWillUnmount () {
      debug('unmount', name)
    }

    render () {
      return <Component {...this.props} />
    }

  }

  return [
    (Component) => withTitle(Component, (props) => {
      const {l} = props
      const title = options.title && options.title.call(null, props)
      const appName = l('app.APP_NAME')
      return title ? `${title} | ${appName}` : appName

    }),
    withCycle,
    (Component) => asBound(Component, mapStateToProps, mapHandleToProps),
    options.onlySigned && onlySigned,
    localized,
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
