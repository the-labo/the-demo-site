/**
 * HOC for role
 * @function withRole
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import { wrapStack } from 'the-component-mixins/helpers'
import { RoleCodes } from '@self/conf'

const hasRole = (user, roleCode) => user?.role?.code === roleCode

/** @lends withRole */
function withRole (Component) {
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
        <Component {...ComponentProps}/>
      )
    }
  }

  WithRole.wrapStack = wrapStack(WithRole, Component)

  return WithRole
}

export default withRole
