/**
 * AccountMypageView component
 */
'use strict'

import React from 'react'
import { TheView, TheSection, TheInfo, TheLink, TheButton, TheButtonGroup } from 'the-components'
import { asView, withTitle, onlySigned } from '../../wrappers'
import styles from './AccountMypageView.pcss'
import { Urls } from '@self/conf'
import { SignScene } from '../../../scenes'

class AccountMypageView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props} = s
    const {
      l,
      busy,
      synced,
      user
    } = props
    const ready = Boolean(synced && user)
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={null}
                        text={l('titles.ACCOUNT_MYPAGE_TITLE')}
        />
        <TheView.Body>
          {
            ready && (
              <div>
                <TheSection>
                  <TheSection.Header lined>
                    {l('captions.ACCOUNT_INFO')}
                  </TheSection.Header>
                  <TheSection.Body>
                    <TheInfo data={{
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
                    <div className={styles.links}>
                      <TheLink to={Urls.SIGNDEL_URL}>{l('buttons.SHOW_SIGNDEL')}</TheLink>
                    </div>
                  </TheSection.Body>
                </TheSection>
              </div>
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {signScene} = s

    ;(async () => {
      await signScene.syncSigned()
    })()
  }

  componentWillUnmount () {
  }
}

export default onlySigned(
  asView(
    withTitle(AccountMypageView, ({l}) => l('titles.ACCOUNT_MYPAGE_TITLE')),
    (state) => ({
      busy: state['sign.signed.busy'],
      synced: state['sign.signed.synced'],
      user: state['sign.signed.user']
    })
  )
)
