/**
 * HOC for role
 * @function withRole
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import { RoleCodes } from '@self/conf'

const hasRole = (user, roleCode) =>
  user?.role?.code === roleCode

/** @lends withRole */
function withRole (Class) {
  @localized
  class WithRole extends React.Component {
    render () {
      const {l} = this.props
      const ComponentProps = {
        isAdmin (user) {
          return hasRole(user, RoleCodes.ADMIN_ROLE)
        },
        roles: {
          [RoleCodes.ADMIN_ROLE]: l('roleCodes.ADMIN_ROLE'),
          [RoleCodes.NORMAL_ROLE]: l('roleCodes.NORMAL_ROLE'),
        },
        ...this.props,
      }
      return (
        <Class {...ComponentProps}/>
      )
    }
  }

  return WithRole
}

export default withRole
