/**
 * RecoverSendView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheCondition, TheDone, TheLead, TheView } from 'the-components'
import styles from './RecoverSendView.pcss'
import { RecoverSendForm } from '../../stateful'

@stateful(
  (state) => ({
    done: state['recover.send.done'],
    failure: state['recover.send.failure'],
  }),
  ({recoverSendScene}) => ({
    onMount: () => recoverSendScene.init(),
  }),
)
@localized
@cycled
@titled(({l}) => l('titles.RECOVER_SEND_TITLE'))
class RecoverSendView extends React.Component {
  render () {
    const {
      done,
      failure,
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={title}
        />
        <TheView.Body>
          <TheCondition if={done}>
            <TheDone linkText={l('buttons.SHOW_TOP_AGAIN')}
                     linkTo='/'
                     message={l('messages.RECOVER_SEND_DONE')}
            />
          </TheCondition>
          <TheCondition unless={done}>
            <div style={{ textAlign: 'center' }}>
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
}

export default RecoverSendView
