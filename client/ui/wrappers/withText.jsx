/**
 * HOC for text
 * @function withText
 */
'use strict'

import React from 'react'

function withText (Class) {
  class WithText extends React.Component {
    render () {
      const s = this
      const {props} = s
      const ComponentProps = Object.assign({
        displayNameForUser (user) {
          if (!user) {
            return null
          }
          const {profile} = user
          return (profile && profile.name) ? profile.name : user.name
        }
      }, props)
      return (
        <Class {...ComponentProps}
        />
      )
    }
  }

  return WithText
}

export default withText
