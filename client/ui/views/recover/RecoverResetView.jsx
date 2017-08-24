/**
 * RecoverResetView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheLead } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { RecoverScene } from '../../../scenes'
import { RecoverResetForm } from '../../fragments'

import styles from './RecoverResetView.pcss'

class RecoverResetView extends React.Component {
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
      errorMessage,
      done,
      values,
      errors
    } = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={null}
        />
        <TheView.Body>
          <TheLead text={l('leads.RECOVER_RESET')}
                   error={errorMessage}
          />

          {
            done ? (
              <TheDone message={l('messages.RECOVER_RESET_DONE')}
                       linkTo='/'
                       linkText={l('buttons.SHOW_TOP_AGAIN')}/>
            ) : (
              <RecoverResetForm spinning={busy}
                                {...{values, errors}}
                                onUpdate={(v) => recoverScene.setResetEntryValues(v)}
                                onSubmit={() => recoverScene.doReset()}
              />
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {recoverScene} = s
    recoverScene.prepareRecoverReset()
  }

  componentWillUnmount () {
  }
}

export default asView(RecoverResetView, (state) => ({
  errorMessage: state['recover.reset.errorMessage'],
  busy: state['recover.reset.busy'],
  done: state['recover.reset.done'],
  values: state['recover.reset.entry.values'],
  errors: state['recover.reset.entry.errors']
}))
