/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful } from 'the-component-mixins'
import { TheView } from 'the-components'
import styles from './HomeView.pcss'

@localized
@cycled
class HomeView extends React.Component {
  render () {
    const {
      busy,
    } = this.props
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Body>
          <p>
            This is the demo of the-site!
          </p>
        </TheView.Body>
      </TheView>
    )

  }
}

export default stateful(
  (state) => ({}),
  ({}) => ({})
)(HomeView)
