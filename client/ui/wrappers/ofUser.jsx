'use strict'

import React from 'react'
import { cycled, stateful } from 'the-component-mixins'

function ofUser (Component) {

  @cycled
  class OfUser extends React.Component {
    render () {
      return (
        <Component {...this.props} />
      )
    }
  }

  return stateful(
    (state, ownProps) => {
      return {
        user: ownProps.user || state['account.entity'],
      }
    },
    (handle, propsProxy) => {
      return {
        onReceive ({user}) {
          user && propsProxy.onUser?.(user)
        },
      }
    }
  )(OfUser)
}

export default ofUser
