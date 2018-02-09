/**
 * RecoverSendView component
 */
'use strict'

import React from 'react'
import { TheCondition, TheDone, TheLead, TheView } from 'the-components'
import styles from './RecoverSendView.pcss'
import { RecoverSendForm } from '../../bounds'
import { asView } from '../../wrappers'

function RecoverSendView ({
                            done,
                            failure,
                            l,
                          }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.RECOVER_SEND_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <TheDone linkText={l('buttons.SHOW_TOP_AGAIN')}
                   linkTo='/'
                   message={l('messages.RECOVER_SEND_DONE')}
          />
        </TheCondition>
        <TheCondition unless={done}>
          <div style={{textAlign: 'center'}}>
            <TheLead error={failure}
                     text={l('leads.RECOVER_SEND')}
            />
            <RecoverSendForm/>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  RecoverSendView,
  (state) => ({
    done: state['recover.send.done'],
    failure: state['recover.send.failure'],
  }),
  ({recoverSendScene}) => ({
    onMount: () => recoverSendScene.init(),
  }),
  {
    title: ({l}) => l('titles.RECOVER_SEND_TITLE'),
  }
)
