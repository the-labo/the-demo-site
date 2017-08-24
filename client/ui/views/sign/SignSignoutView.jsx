/**
 * SignSignoutView component
 */
'use strict'

import React from 'react'
import { TheView } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { SignScene } from '../../../scenes'
import { Icons } from '@self/conf'
import styles from 'SignSignoutView.pcss'

class SignSignoutView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props} = s
    const {l, busy} = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGNOUT_ICON}
                        text={l('titles.SIGNOUT_VIEW_TITLE')}
        />
        <TheView.Body>
          <TheView.Message>
            {busy ? l('messages.WORKING_SIGNOUT') : l('messages.WORKING_DONE')}
          </TheView.Message>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {signScene} = s

    ;(async () => {
      await signScene.doSignout()
      await signScene.finishSignout()
    })()
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    const {signScene} = s
    let {user} = nextProps

    ;(async () => {
      if (!user) {
        console.warn('[SignoutView] Already signed out')
        await signScene.finishSignout()
      }
    })()
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(SignSignoutView, ({l}) => l('titles.SIGNOUT_VIEW_TITLE')),
  (state) => ({
    user: state['sign.signed.user'],
    busy: state['sign.signout.busy']
  })
)
