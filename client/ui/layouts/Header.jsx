/**
 * Header component
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import {
  TheButton,
  TheButtonGroup,
  TheCondition,
  TheDropdownMenu,
  TheHeader,
} from 'the-components'
import { asBound, compose } from 'the-hoc'
import { Icons, Urls } from '@self/conf'
import { UserLabel } from '../fragments'
import { withRole } from '../wrappers'

const Header = compose(
  withRole,
  localized,
)(function HeaderImpl ({
                         isAdmin,
                         l,
                         needsVerify,
                         onVerify,
                         ready,
                         user,
                       }) {
  const notices = user && needsVerify && {
    [l('messages.NEEDS_EMAIL_VERIFIED')]: {[l('buttons.DO_SEND_VERIFY')]: onVerify},
  } || {}
  return (
    <TheHeader notices={notices}>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>

      <TheHeader.Tab>
        <TheCondition if={Boolean(user && isAdmin(user))}>
          <TheHeader.TabItem icon={Icons.TAB_ADMIN_ICON}
                             to={Urls.ADMIN_URL}
          >{l('tabs.ADMIN_TAB')}</TheHeader.TabItem>
        </TheCondition>
      </TheHeader.Tab>
      <TheCondition if={Boolean(ready)}>
        <TheHeader.RightArea>
          <TheCondition if={Boolean(user)}>
            <TheDropdownMenu label={<UserLabel {...{user}} />}
                             righted

            >
              <TheDropdownMenu.Item icon={Icons.ACCOUNT_ICON}
                                    text={l('buttons.SHOW_MYPAGE')}
                                    to={Urls.ACCOUNT_MYPAGE_URL}/>
              <TheDropdownMenu.Item icon={Icons.SIGN_OUT_ICON}
                                    text={l('buttons.DO_SIGN_OUT')}
                                    to={Urls.SIGN_OUT_URL}/>
            </TheDropdownMenu>
          </TheCondition>
          <TheCondition unless={Boolean(user)}>
            <TheButtonGroup>
              <TheButton to={Urls.SIGN_IN_URL}>{l('buttons.SHOW_SIGN_IN')}</TheButton>
              <TheButton primary to={Urls.SIGN_UP_URL}>{l('buttons.SHOW_SIGN_UP')}</TheButton>
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
    needsVerify: state['verify.need.needed'],
    pathname: state['app.pathname'],
    ready: state['account.ready'],
    user: state['account.user'],
  }),
  ({
     l,
     toastScene,
     verifyNeedScene,
     verifySendScene,
   }) => ({
    onVerify: async () => {
      await verifySendScene.doSend()
      await verifyNeedScene.doSync()
      toastScene.showInfo(l('toasts.VERIFY_EMAIL_SENT'))
      verifyNeedScene.set({needed: false})
    },
  })
)
