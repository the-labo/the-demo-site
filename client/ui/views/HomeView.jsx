/**
 * HomeView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful } from 'the-component-mixins'
import { TheCondition, TheView } from 'the-components'
import styles from './HomeView.pcss'
import { HomePanel, Intro } from '../stateful'
import { ofUser } from '../wrappers'

@ofUser
@localized
@cycled
class HomeView extends React.Component {
  render () {
    const {
      busy,
      l,
      user,
    } = this.props
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Body>
          <TheCondition if={!user}>
            <div>
              <HomePanel/>
              <Intro/>
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }
}

export default stateful(
  (state) => ({}),
  ({}) => ({})
)(HomeView)
