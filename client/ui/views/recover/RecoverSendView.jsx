/**
 * RecoverSendView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead, TheCondition } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { RecoverSendForm } from '../../fragments'
import styles from './RecoverSendView.pcss'

class RecoverSendView extends React.Component {
  render () {
    const s = this
    const {
      l,
      errorMessage,
      done
    } = s.props
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
                       error={errorMessage}
              />
              <RecoverSendForm/>
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {onSetup} = s.props
    onSetup()
  }

  componentWillUnmount () {
    const s = this
    const {onTeardown} = s.props
    onTeardown()
  }
}

export default asView(
  withTitle(RecoverSendView, ({l}) => l('titles.RECOVER_SEND_TITLE')),
  (state) => ({
    errorMessage: state['auto.recover.send.errorMessage'],
    done: state['auto.recover.send.done']
  }),
  ({recoverScene}) => ({
    onSetup: () => recoverScene.setEntryValues({}),
    onTeardown: () => recoverScene.dropEntryValues()
  })
)
