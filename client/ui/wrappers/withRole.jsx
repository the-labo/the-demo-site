/**
 * HOC for role
 * @function withRole
 */
'use strict'

import React from 'react'
import { RoleCodes } from '@self/conf'

const hasRole = (user, roleCode) =>
  user?.role?.code === roleCode

/** @lends withRole */
function withRole (Class) {
  const methods = {
    isAdmin (user) {
      return hasRole(user, RoleCodes.ADMIN_ROLE)
    }
  }

  class WithRole extends React.Component {
    render () {
      return (
        <Class {...methods}
               {...this.props}/>
      )
    }
  }

  return WithRole
}

export default withRole
