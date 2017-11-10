/**
 * VerifyConfirmView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView, withTitle } from '../../wrappers/index'
import styles from './VerifyConfirmView.pcss'

class VerifyConfirmView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const {
      l,
      busy,
      done,
      errorMessage
    } = s.props
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
              <p className={styles.error}>{errorMessage}</p>
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {onSetup, onReady} = s.props

    onSetup()
    onReady()
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(VerifyConfirmView, ({l}) => l('titles.ACCOUNT_VERIFY_TITLE')),
  (state) => ({
    busy: state['auth.verify.busy'],
    done: state['auth.verify.done'],
    errorMessage: state['verify.errorMessage'],
  }),
  ({verifyScene}) => (({
    onSetup: () => verifyScene.toggleDone(false),
    onReady: () => verifyScene
  }))
)
