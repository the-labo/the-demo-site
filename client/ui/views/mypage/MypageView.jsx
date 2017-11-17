/**
 * MypageView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheSection,
  TheInfo,
  TheLink,
  TheButton,
  TheButtonGroup,
  TheCondition
} from 'the-components'
import { asView, onlySigned } from '../../wrappers'
import styles from './MypageView.pcss'
import { Urls } from '@self/conf'

function MypageView ({
                       l,
                       busy,
                       synced,
                       user
                     }) {
  const ready = Boolean(synced && user)
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={l('titles.ACCOUNT_MYPAGE_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={ready}>
          <div>
            <TheSection>
              <TheSection.Header lined>
                {l('captions.ACCOUNT_INFO')}
              </TheSection.Header>
              <TheSection.Body>
                <TheInfo data={user && {
                  [l('labels.USER_NAME')]: user.name,
                  [l('labels.USER_PROFILE_NAME')]: user.profile.name,
                  [l('labels.USER_EMAIL')]: user.profile.email
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
                  <TheLink to={Urls.SIGNDEL_URL}>{l('buttons.SHOW_SIGNDEL')}</TheLink>
                </div>
              </TheSection.Body>
            </TheSection>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default onlySigned(
  asView(
    MypageView,
    (state) => ({
      busy: state['sign.signed.busy'],
      synced: state['sign.signed.synced'],
      user: state['sign.signed.user']
    }),
    () => ({}),
    {
      title: ({l}) => l('titles.ACCOUNT_MYPAGE_TITLE')
    }
  )
)
