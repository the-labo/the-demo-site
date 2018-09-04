/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheCondition, TheDone, TheView } from 'the-components'
import styles from './VerifyConfirmView.pcss'

@stateful(
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
      await verifyConfirmScene.doExec()
      verifyConfirmScene.set({done: true})
    },
  })),
)
@localized
@cycled
@titled(({l}) => l('titles.ACCOUNT_VERIFY_TITLE'))
class VerifyConfirmView extends React.Component {
  render () {
    const {
      busy,
      done,
      failure,
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={null}
                        text={title}
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
}

export default VerifyConfirmView
