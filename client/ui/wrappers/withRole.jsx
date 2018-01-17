/**
 * HOC for role
 * @function withRole
 */
'use strict'

import React from 'react'
import { RoleCodes } from '@self/conf'

const hasRole = (user, roleCode) =>
  user?.role.code === roleCode

/** @lends withRole */
function withRole (Class) {
  class WithRole extends React.Component {
    render () {

      const ComponentProps = Object.assign({
        isAdmin (user) {
          return hasRole(user, RoleCodes.ADMIN_ROLE)
        }
      }, this.props)
      return (
        <Class {...ComponentProps}/>
      )
    }
  }

  return WithRole
}

export default withRole
