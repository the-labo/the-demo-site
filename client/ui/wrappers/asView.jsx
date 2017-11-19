'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { withClient } from 'the-client/shim'
import { withHistory, withRoute } from 'the-components'
import { connect, withStore } from 'the-store'
import withTitle from './withTitle'
import { inject } from 'the-handle'
import { get } from 'the-window'
import onlySigned from './onlySigned'

function asView (Component,
                 mapStateToProps = () => ({}),
                 mapHandleToProps = () => ({}),
                 options = {}) {

  class ViewWrap extends React.Component {
    render () {
      const s = this
      return <Component {...s.props}
                        pathname={get('location.pathname')}
      />
    }

    componentDidMount () {
      const s = this
      const {onMount} = s.props
      onMount && onMount()
    }

    componentWillReceiveProps (nextProps) {
      const s = this
      const receiving = {}
      for (const [key, value] of Object.entries(nextProps)) {
        if (s.props[key] !== value)
          receiving[key] = value
      }
      const {onReceive} = s.props
      onReceive && onReceive(receiving)
    }

    componentWillUnmount () {
      const s = this
      const {onTeardown} = s.props
      onTeardown && onTeardown()
    }

  }

  return [
    (Componnet) => withTitle(Componnet, options.title),
    connect(mapStateToProps),
    inject(mapHandleToProps),
    options.onlySigned && onlySigned,
    withLoc,
    withStore,
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
