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
                            l,
                            back
                          }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header leftIcon={Icons.BACK_ICON}
                      leftTo={back}
                      icon={null}
                      text={l('titles.SIGNASK_VIEW_TITLE')}

      />
      <TheView.Body>
        <TheLead text={l('messages.NEEDS_SIGNIN_IN')}/>

        <br/>

        <TheButtonGroup>
          <TheButton to={Urls.SIGNIN_URL}>{l('buttons.SHOW_SIGNIN')}</TheButton>
          <TheButton to={Urls.SIGNUP_URL}
                     primary>{l('buttons.SHOW_SIGNUP')}</TheButton>
        </TheButtonGroup>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignAskView,
  (state) => ({
    back: state['sign.ask.back'] || '/'
  }),
  ({}) => ({}),
  {
    title: ({l}) => l('titles.SIGNASK_VIEW_TITLE')
  }
)
