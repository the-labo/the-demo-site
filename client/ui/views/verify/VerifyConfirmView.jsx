/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import styles from './VerifyConfirmView.pcss'
import { urlUtil } from '@self/utils'

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
    busy: state['verify.verify.busy'],
    done: state['verify.verify.done'],
    failure: state['verify.verify.failure'],
  }),
  ({verifyVerifyScene}) => (({
    onMount: async () => {
      verifyVerifyScene.init()
      const {seal, envelop} = urlUtil.queryFromSearch()
      verifyVerifyScene.set({seal, envelop})
      await verifyVerifyScene.doVerify()
      verifyVerifyScene.set({done: true})
    },
  })),
  {
    title: ({l}) => l('titles.ACCOUNT_VERIFY_TITLE')
  }
)
