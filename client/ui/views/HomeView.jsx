/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton } from 'the-components'
import { asView } from '../wrappers'
import styles from './HomeView.pcss'

function HomeView ({
                     busy
                   }) {
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={null}
      />
      <TheView.Body>
        <p>
        </p>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  HomeView,
  (state) => ({
  })
)


