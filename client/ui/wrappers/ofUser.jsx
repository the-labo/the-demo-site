'use strict'

import React from 'react'
import { cycled, stateful } from 'the-component-mixins'
import { wrapStack } from 'the-component-mixins/helpers'

function ofUser (Component) {

  @cycled
  class OfUser extends React.Component {
    render () {
      return (
        <Component {...this.props} />
      )
    }
  }

  OfUser.wrapStack = wrapStack(OfUser, Component)

  return stateful(
    (state, ownProps) => ({
      user: ownProps.user || state['account.entity'],
    }),
    (handle, propsProxy) => ({
      onReceive ({user}) {
        user && propsProxy.onUser?.(user)
      },
    })
  )(OfUser)
}

export default ofUser
