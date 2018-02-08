/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import styles from './VerifyConfirmView.pcss'

function VerifyConfirmView ({
                              busy,
                              done,
                              failure,
                              l,
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
            <TheDone linkText={l('buttons.SHOW_TOP_AGAIN')}
                     linkTo='/'
                     message={l('messages.VERIFY_DONE')}
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
    busy: state['verify.confirm.busy'],
    done: state['verify.confirm.done'],
    failure: state['verify.confirm.failure'],
    query: state['app.query'],
  }),
  ({verifyConfirmScene}, propsProxy) => (({
    onMount: async () => {
      verifyConfirmScene.init()
      const {envelop, seal} = propsProxy.query
      verifyConfirmScene.setEntry({envelop, seal})
      await verifyConfirmScene.doVerify()
      verifyConfirmScene.set({done: true})
    },
  })),
  {
    title: ({l}) => l('titles.ACCOUNT_VERIFY_TITLE'),
  }
)
