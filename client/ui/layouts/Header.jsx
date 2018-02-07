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
  TheCondition,
} from 'the-components'
import { Urls, Icons } from '@self/conf'
import { UserLabel } from '../fragments'
import { withRole } from '../wrappers'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'

const Header = compose(
  withRole,
  withLoc,
)(function HeaderImpl ({
                         isAdmin,
                         l,
                         needsVerify,
                         onVerify,
                         ready,
                         user,
                       }) {
  const notices = user && needsVerify && {
    [l('messages.NEEDS_EMAIL_VERIFIED')]: {[l('buttons.DO_SEND_VERIFY')]: onVerify,},
  } || {}
  return (
    <TheHeader notices={notices}>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>

      <TheHeader.Tab>
        <TheCondition if={Boolean(user && isAdmin(user))}>
          <TheHeader.TabItem to={Urls.ADMIN_URL}
                             icon={Icons.ADMIN_ICON}
          >{l('tabs.ADMIN_TAB')}</TheHeader.TabItem>
        </TheCondition>
      </TheHeader.Tab>
      <TheCondition if={Boolean(ready)}>
        <TheHeader.RightArea>
          <TheCondition if={Boolean(user)}>
            <TheDropdownMenu righted
                             label={<UserLabel {...{user,}} />}

            >
              <TheDropdownMenu.Item icon={Icons.ACCOUNT_ICON}
                                    to={Urls.ACCOUNT_MYPAGE_URL}
                                    text={l('buttons.SHOW_MYPAGE')}/>
              <TheDropdownMenu.Item to={Urls.SIGN_OUT_URL}
                                    icon={Icons.SIGN_OUT_ICON}
                                    text={l('buttons.DO_SIGN_OUT')}/>
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
      verifyNeedScene.set({needed: false,})
    },
  })
)
