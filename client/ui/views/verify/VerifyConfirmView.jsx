/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone } from 'the-components'
import { asView } from '../../wrappers/index'
import styles from './VerifyConfirmView.pcss'
import { VerifyScene } from '../../../scenes/index'

class VerifyConfirmView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.verifyScene = new VerifyScene(props)
  }

  render () {
    const s = this
    const {props} = s
    const {
      l,
      busy,
      done,
      error
    } = props
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={null}
                        text={l('titles.ACCOUNT_VERIFY_TITLE')}
        />
        <TheView.Body>
          {
            done ? (
              <div>
                <TheDone message={l('messages.VERIFY_DONE')}
                         linkTo='/'
                         linkText={l('buttons.SHOW_TOP_AGAIN')}
                />
              </div>
            ) : (
              <div>
                <p className={styles.error}>{error}</p>
              </div>
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {verifyScene} = s

    ;(async () => {
      await verifyScene.doVerify()
    })()

  }

  componentWillUnmount () {
  }
}

export default asView(VerifyConfirmView, (state) => ({
  busy: state['account.verify.busy'],
  done: state['account.verify.done'],
  error: state['account.verify.error'],
}))
