/**
 * SignAskView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup, TheLead } from 'the-components'
import { asView } from '../../wrappers'
import { Urls, Icons } from '@self/conf'
import styles from './SignAskView.pcss'

function SignAskView ({
                        back,
                        l,
                      }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header leftIcon={Icons.BACK_ICON}
                      leftTo={back}
                      icon={null}
                      text={l('titles.SIGN_ASK_TITLE')}

      />
      <TheView.Body>
        <TheLead text={l('messages.NEEDS_SIGN_IN_IN')}/>

        <br/>

        <TheButtonGroup>
          <TheButton to={Urls.SIGN_IN_URL}>{l('buttons.SHOW_SIGN_IN')}</TheButton>
          <TheButton to={Urls.SIGN_UP_URL}
                     primary>{l('buttons.SHOW_SIGN_UP')}</TheButton>
        </TheButtonGroup>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignAskView,
  (state) => ({
    back: state['sign.ask.back'] || '/',
    user: state['account.user'],
  }),
  ({
     signAskScene
   }) => ({
    onReceive: async ({user}) => {
      if (user) {
        signAskScene.goBack()
      }
    }
  }),
  {
    title: ({l}) => l('titles.SIGN_ASK_TITLE')
  }
)
