/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { TheButton, TheView } from 'the-components'
import styles from './HomeView.pcss'
import { asView } from '../wrappers'

class HomeView extends React.Component {
  render () {
    const {
                     busy,
    } = this.props
    
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={null}
      />
      <TheView.Body>
        <p>
          This is the demo of the-site!
        </p>
      </TheView.Body>
    </TheView>
  )

  }
}

export default asView(
  HomeView,
  (state) => ({})
)
