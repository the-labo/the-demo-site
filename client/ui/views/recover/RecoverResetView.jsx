/**
 * RecoverResetView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import { RecoverResetForm } from '../../bounds'

import styles from './RecoverResetView.pcss'

function RecoverResetView ({
                             done,
                             failure,
                             l,
                           }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={null}
      />
      <TheView.Body>
        <TheLead title={l('leads.RECOVER_RESET')}
                 error={failure}
        />
        <TheCondition if={done}>
          <TheDone message={l('messages.RECOVER_RESET_DONE')}
                   linkTo='/'
                   linkText={l('buttons.SHOW_TOP_AGAIN')}/>
        </TheCondition>
        <TheCondition unless={done}>
          <RecoverResetForm/>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  RecoverResetView,
  (state) => ({
    busy: state['recover.reset.busy'],
    done: state['recover.reset.done'],
    failure: state['recover.reset.failure'],
    query: state['app.query'],
  }),
  ({propsProxy, recoverResetScene,}) => ({
    onMount: () => {
      recoverResetScene.init()
      const {envelop, seal,} = propsProxy.query
      recoverResetScene.setEntry({envelop, seal,})
    },
  })
)
