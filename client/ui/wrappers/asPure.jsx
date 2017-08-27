/**
 * Wrap component as pure
 * @function asPure
 */
'use strict'

import React from 'react'

function asPure (Component, options = {}) {
  return class AsPure extends React.PureComponent {
    render () {
      const s = this
      const {props} = s
      return <Component {...props}/>
    }
  }
}

export default asPure
