/**
 * Header component
 */
'use strict'

import React from 'react'
import {
  TheHeader,
  TheButton,
  TheButtonGroup,
  TheDropdownMenu
} from 'the-components'
import { withLoc } from 'the-loc'
import { Urls, Icons } from '@self/conf'
import { withRole } from '../wrappers'

const Header = ({l, isAdmin, user}) => {
  return (
    <TheHeader className='header'>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>

      <TheHeader.Tab>
        {
          user && isAdmin(user) && (
            <TheHeader.TabItem to={Urls.ADMIN_USERS_URL}
                               icon={Icons.USERS_ICON}
                               text={l('buttons.SHOW_ADMIN_USERS')}
            />
          )
        }
      </TheHeader.Tab>

      <TheHeader.RightArea>
        {
          user ? (
            <TheDropdownMenu righted>
              <TheDropdownMenu.Item to={Urls.SIGNOUT_URL}
                                    icon={Icons.SIGNOUT_ICON}
                                    text={l('buttons.DO_SIGNOUT')}/>
            </TheDropdownMenu>
          ) : (
            <TheButtonGroup>
              <TheButton to={Urls.SIGNIN_URL}>{l('buttons.SHOW_SIGNIN')}</TheButton>
              <TheButton primary to={Urls.SIGNUP_URL}>{l('buttons.SHOW_SIGNUP')}</TheButton>
            </TheButtonGroup>
          )
        }
      </TheHeader.RightArea>
    </TheHeader>
  )
}

export default withRole(
  withLoc(Header)
)
