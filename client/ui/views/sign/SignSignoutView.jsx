/**
 * SignSignoutView component
 */
'use strict'

import React from 'react'
import { TheView } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { Icons } from '@self/conf'
import styles from './SignSignoutView.pcss'

class SignSignoutView extends React.Component {
  render () {
    const s = this
    const {l, busy} = s.props
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
    const {onReady} = s.props
    onReady()
  }
}

export default asView(
  withTitle(SignSignoutView, ({l}) => l('titles.SIGNOUT_VIEW_TITLE')),
  (state) => ({
    user: state['auth.user'],
    busy: state['auth.signout.busy']
  }),
  ({signoutScene}) => ({
    onReady: () => signoutScene.doSignout()
  })
)
