/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton } from 'the-components'
import { asView } from '../wrappers'
import styles from './HomeView.pcss'

function HomeView ({}) {
  return (
    <TheView className={styles.self}>
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
    busy: state['app.busy']
  })
)


