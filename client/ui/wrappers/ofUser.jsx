'use strict'

import React from 'react'
import { cycled, stateful } from 'the-component-mixins'
import { wrapStack } from 'the-component-util'

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
    (handle, propsProxy, ownProps) => ({
      onReceive: (recieved) => {
        const { user } = recieved
        user && propsProxy.onUser?.(user)
        if ('onReceive' in ownProps) {
          ownProps.onReceive(recieved)
        }
      },
    })
  )(OfUser)
}

export default ofUser
