/**
 * MypageView component
 */
'use strict'

import { Urls } from '@self/conf'
import React from 'react'
import {
  TheButton,
  TheButtonGroup,
  TheCondition,
  TheInfo,
  TheLink,
  TheSection,
  TheView,
} from 'the-components'
import styles from './MypageView.pcss'
import { UserImage } from '../../fragments'
import { asView } from '../../wrappers'

function MypageView ({
                       busy,
                       l,
                       ready,
                       user,
                     }) {
  const {profile} = user || {}
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={l('titles.ACCOUNT_MYPAGE_TITLE')}
      />
      <TheView.Body narrow>
        <TheCondition if={ready}>
          <div>
            <TheSection>
              <TheSection.Header lined>
                {l('captions.ACCOUNT_INFO')}
              </TheSection.Header>
              <TheSection.Body>
                <TheInfo data={user && {
                  [l('labels.USER_NAME')]: user.name,
                  [l('labels.USER_PROFILE_NAME')]: profile?.name,
                  [l('labels.USER_EMAIL')]: profile?.email,
                  [l('labels.USER_IMAGE')]: <UserImage {...{user}} size={64}/>,
                }}/>
                <br/>
                <TheButtonGroup>
                  <TheButton to={Urls.ACCOUNT_PASSWORD_URL}>
                    {l('buttons.SHOW_PASSWORD_EDIT')}
                  </TheButton>
                  <TheButton to={Urls.ACCOUNT_PROFILE_URL}>
                    {l('buttons.SHOW_PROFILE_EDIT')}
                  </TheButton>
                </TheButtonGroup>

                <br/>
                <hr/>
                <br/>
                <div className={styles.links}>
                  <TheLink to={Urls.ACCOUNT_QUIT_URL}>{l('buttons.SHOW_QUIT')}</TheLink>
                </div>
              </TheSection.Body>
            </TheSection>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  MypageView,
  (state) => ({
    busy: state['account.busy'],
    ready: state['account.ready'],
    user: state['account.user'],
  }),
  () => ({}),
  {
    onlySigned: true,
    title: ({l}) => l('titles.ACCOUNT_MYPAGE_TITLE'),
  }
)
