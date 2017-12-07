/**
 * Header component
 */
'use strict'

import React from 'react'
import {
  TheHeader,
  TheButton,
  TheButtonGroup,
  TheDropdownMenu,
  TheCondition
} from 'the-components'
import { Urls, Icons } from '@self/conf'
import { get } from 'the-window'
import { labelHelper } from '../helpers'
import { asPure, asBound, compose, withRole, withLoc } from '../wrappers'

const {labelForUser} = labelHelper

const Header = compose(
  withRole,
  withLoc
)(function HeaderImpl ({
                         l,
                         isAdmin,
                         synced,
                         user,
                         notices
                       }) {
  return (
    <TheHeader className='header'
               notices={notices}>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>

      <TheHeader.Tab>
        <TheCondition if={Boolean(user && isAdmin(user))}>
          <TheHeader.TabItem to={Urls.ADMIN_URL}
                             icon={Icons.ADMIN_ICON}
          >{l('tabs.ADMIN_TAB')}</TheHeader.TabItem>
        </TheCondition>
      </TheHeader.Tab>
      <TheCondition if={Boolean(synced)}>
        <TheHeader.RightArea>
          <TheCondition if={Boolean(user)}>
            <TheDropdownMenu righted
                             label={labelForUser(user)}

            >
              <TheDropdownMenu.Item icon={Icons.ACCOUNT_ICON}
                                    to={Urls.ACCOUNT_MYPAGE_URL}
                                    text={l('buttons.SHOW_MYPAGE')}/>
              <TheDropdownMenu.Item to={Urls.SIGNOUT_URL}
                                    icon={Icons.SIGNOUT_ICON}
                                    text={l('buttons.DO_SIGNOUT')}/>
            </TheDropdownMenu>
          </TheCondition>
          <TheCondition unless={Boolean(user)}>
            <TheButtonGroup>
              <TheButton to={Urls.SIGNIN_URL}>{l('buttons.SHOW_SIGNIN')}</TheButton>
              <TheButton primary to={Urls.SIGNUP_URL}>{l('buttons.SHOW_SIGNUP')}</TheButton>
            </TheButtonGroup>
          </TheCondition>
        </TheHeader.RightArea>
      </TheCondition>
    </TheHeader>
  )
})

export default asBound(
  Header,
  (state) => ({
    pathname: get('location.pathname')
  }),
  () => ({}),
  {}
)
