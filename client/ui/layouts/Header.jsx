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
import { withRole, withText } from '../wrappers'

const Header = ({
                  l,
                  isAdmin,
                  synced,
                  user,
                  displayNameForUser
                }) => {
  return (
    <TheHeader className='header'>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>

      <TheHeader.Tab>
        {
          user && isAdmin(user) && (
            <TheHeader.TabItem to={Urls.ADMIN_URL}
            >{l('tabs.ADMIN_MENU')}</TheHeader.TabItem>
          )
        }
      </TheHeader.Tab>

      {
        synced && (
          <TheHeader.RightArea>
            {
              user ? (
                <TheDropdownMenu righted
                                 label={displayNameForUser(user)}

                >
                  <TheDropdownMenu.Item icon={Icons.PASSWORD_ICON}
                                        to={Urls.ACCOUNT_PASSWORD_URL}
                                        text={l('buttons.SHOW_PASSWORD_EDIT')}/>
                  <TheDropdownMenu.Item icon={Icons.PROFILE_ICON}
                                        to={Urls.ACCOUNT_PROFILE_URL}
                                        text={l('buttons.SHOW_PROFILE_EDIT')}/>
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
        )
      }
    </TheHeader>
  )
}

export default withRole(
  withText(
    withLoc(Header)
  )
)
