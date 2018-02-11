/**
 * Intro component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'

@localized
class Intro extends React.Component {
  render () {
    const {l} = this.props
    return (
      <div>
      </div>
    )
  }
}

export default stateful(
  (state) => ({

  }),
  ({}) => ({
  }),
)(Intro)
