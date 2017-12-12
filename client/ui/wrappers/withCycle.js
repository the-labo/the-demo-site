/**
 * HOC for role
 * @function withCycle
 */
'use strict'

import React from 'react'

/** @lends withCycle */
function withCycle (Class) {
  class WithCycle extends React.Component {
    render () {
      const s = this
      return (
        <Class {...s.props}/>
      )
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
      const {onUnmount} = s.props
      onUnmount && onUnmount()
    }

  }

  return WithCycle
}

export default withCycle
