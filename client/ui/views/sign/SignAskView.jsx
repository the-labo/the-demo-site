/**
 * SignAskView component
 */
'use strict'

import React from 'react'
import { TheButton, TheButtonGroup, TheLead, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './SignAskView.pcss'
import { asView } from '../../wrappers'

class SignAskView extends React.Component {
  render () {
    const {
                        back,
                        l,
    } = this.props
    
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      leftIcon={Icons.BACK_ICON}
                      leftTo={back}
                      text={l('titles.SIGN_ASK_TITLE')}

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

export default asView(
  SignAskView,
  (state) => ({
    back: state['sign.ask.back'] || '/',
    user: state['account.user'],
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
  {
    title: ({l}) => l('titles.SIGN_ASK_TITLE'),
  }
)
