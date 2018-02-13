/**
 * SignAskView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheButton, TheButtonGroup, TheLead, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './SignAskView.pcss'

@localized
@cycled
@titled(({l}) => l('titles.SIGN_ASK_TITLE'))
class SignAskView extends React.Component {
  render () {
    const {
      back,
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        leftIcon={Icons.BACK_ICON}
                        leftTo={back}
                        text={title}

        />
        <TheView.Body>
          <TheLead text={l('messages.NEEDS_SIGN_IN_IN')}/>
          <br/>

          <TheButtonGroup>
            <TheButton to={Urls.SIGN_IN_URL}>{l('buttons.SHOW_SIGN_IN')}</TheButton>
            <TheButton primary
                       to={Urls.SIGN_UP_URL}>{l('buttons.SHOW_SIGN_UP')}</TheButton>
          </TheButtonGroup>
        </TheView.Body>
      </TheView>
    )
  }
}

export default stateful(
  (state) => ({
    back: state['sign.ask.back'] || '/',
    user: state['account.entity'],
  }),
  ({
     signAskScene,
   }) => ({
    onReceive: async ({user}) => {
      if (user) {
        signAskScene.goBack()
      }
    },
  }),
)(SignAskView)
