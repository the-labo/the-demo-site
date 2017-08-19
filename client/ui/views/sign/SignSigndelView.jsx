/**
 * SignSigndelView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup } from 'the-components'
import { asView } from '../../wrappers'
import styles from './SignSigndelView.pcss'

class SignSigndelView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const {props} = s
    const {
      l
    } = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.SIGNDEL_VIEW_TITLE')}
        />
        <TheView.Body>
          <TheButtonGroup>
          </TheButtonGroup>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(SignSigndelView, (state) => ({}))
