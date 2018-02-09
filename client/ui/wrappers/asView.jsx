'use strict'

import Debug from 'debug'
import React from 'react'
import { cycled, localized, stateful } from 'the-component-mixins'
import { withHistory, withRoute } from 'the-components'
import { asBound, withTitle } from 'the-hoc'
import onlySigned from './onlySigned'

const debug = Debug('app:view')

function asView (Component,
                 mapStateToProps,
                 mapHandleToProps) {
  const name = Component.displayName || Component.name

  @cycled
  @withRoute
  @withHistory
  @localized
  @stateful(mapStateToProps, mapHandleToProps)
  class AsView extends React.Component {
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

  return AsView

}

export default asView
