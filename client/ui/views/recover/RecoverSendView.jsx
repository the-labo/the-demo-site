/**
 * RecoverSendView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import { RecoverSendForm } from '../../fragments'
import styles from './RecoverSendView.pcss'

function RecoverSendView ({
                            l,
                            failure,
                            done
                          }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.RECOVER_SEND_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <TheDone linkTo='/'
                   linkText={l('buttons.SHOW_TOP_AGAIN')}
                   message={l('messages.RECOVER_SEND_DONE')}
          />
        </TheCondition>
        <TheCondition unless={done}>
          <div>
            <TheLead text={l('leads.RECOVER_SEND')}
                     error={failure}
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
    failure: state['auto.recover.send.failure'],
    done: state['auto.recover.send.done']
  }),
  ({recoverScene}) => ({
    onSetup: () => recoverScene.init()
  }),
  {
    title: ({l}) => l('titles.RECOVER_SEND_TITLE')
  }
)
