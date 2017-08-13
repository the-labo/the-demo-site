/**
 * RecoverSendView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone } from 'the-components'
import { asView } from '../../wrappers/index'
import { RecoverScene } from '../../../scenes'
import { RecoverSendForm } from '../../fragments'
import styles from './RecoverSendView.pcss'

class RecoverSendView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.recoverScene = new RecoverScene(props)
  }

  render () {
    const s = this
    const {props, recoverScene} = s
    const {
      l,
      busy,
      done,
      values,
      errors
    } = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.RECOVER_SEND_TITLE')}
        />
        <TheView.Body>
          {
            done ? (
              <RecoverSendForm spinning={busy}
                               {...{values, errors}}
                               onUpdate={(v) => recoverScene.setSendEntryValues(v)}
                               onSubmit={() => recoverScene.doSend()}
              />
            ) : (
              <TheDone linkTo='/'
                       linkText={l('buttons.SHOW_TOP_AGAIN')}
                       message={l('messages.RECOVER_SEND_DONE')}
              />
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
  }

  componentWillUnmount () {
  }
}

export default asView(RecoverSendView, (state) => ({
  busy: state['recover.send.busy'],
  done: state['recover.send.done'],
  values: state['recover.send.entry.values'],
  errors: state['recover.send.entry.errors']
}))
