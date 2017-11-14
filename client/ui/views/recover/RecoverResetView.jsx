/**
 * RecoverResetView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import { RecoverScene } from '../../../scenes'
import { RecoverResetForm } from '../../fragments'

import styles from './RecoverResetView.pcss'

function RecoverResetView ({
                             l,
                             failure,
                             done
                           }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={null}
      />
      <TheView.Body>
        <TheLead text={l('leads.RECOVER_RESET')}
                 error={failure}
        />
        <TheCondition if={done}>
          <TheDone message={l('messages.RECOVER_RESET_DONE')}
                   linkTo='/'
                   linkText={l('buttons.SHOW_TOP_AGAIN')}/>
        </TheCondition>
        <TheCondition unless={done}>
          <RecoverResetForm/>}
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  RecoverResetView,
  (state) => ({
    failure: state['recover.reset.failure'],
    busy: state['recover.reset.busy'],
    done: state['recover.reset.done'],
  }),
  ({recoverResetView}) => ({
    onSetup: recoverResetView.toggle({done: false})
  })
)
