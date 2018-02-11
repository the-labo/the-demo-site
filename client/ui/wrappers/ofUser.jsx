'use strict'

import React from 'react'
import { cycled, stateful } from 'the-component-mixins'

function ofUser (Component,
                 options = {}) {

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
          if (user) {
            propsProxy.onUser?.(user)
          }
        },
      }
    },
    options
  )(OfUser)
}

export default ofUser
