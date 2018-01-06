/**
 * RecoverResetView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import { RecoverResetForm } from '../../bounds'
import { urlUtil } from '@self/utils'

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
    failure: state['recoverReset.failure'],
    busy: state['recoverReset.busy'],
    done: state['recoverReset.done'],
  }),
  ({recoverResetScene}) => ({
    onMount: () => {
      recoverResetScene.init()
      const {seal, envelop} = urlUtil.queryFromSearch()
      recoverResetScene.setEntry({seal, envelop})
    }
  })
)
