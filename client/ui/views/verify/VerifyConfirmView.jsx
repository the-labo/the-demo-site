/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView } from '../../wrappers/index'
import styles from './VerifyConfirmView.pcss'

function VerifyConfirmView ({
                              l,
                              busy,
                              done,
                              failure
                            }) {
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={l('titles.ACCOUNT_VERIFY_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <div>
            <TheDone message={l('messages.VERIFY_DONE')}
                     linkTo='/'
                     linkText={l('buttons.SHOW_TOP_AGAIN')}
            />
          </div>
        </TheCondition>
        <TheCondition unless={done}>
          <div>
            <p className={styles.error}>{failure}</p>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  VerifyConfirmView,
  (state) => ({
    busy: state['auth.verify.busy'],
    done: state['auth.verify.done'],
    failure: state['verify.failure'],
  }),
  ({verifyScene}) => (({
    onSetup: () => verifyScene.set({done: false}),
  })),
  {
    title: ({l}) => l('titles.ACCOUNT_VERIFY_TITLE')
  }
)
