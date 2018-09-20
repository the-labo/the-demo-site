/**
 * HomePanel component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheButton, TheButtonGroup, TheContainer, TheLink, TheSpin } from 'the-components'
import { Urls } from '@self/conf'
import styles from './HomePanel.pcss'

@stateful(
  (state) => ({}),
  ({}) => ({}),
)
@localized
class HomePanel extends React.Component {
  render () {
    const {l} = this.props
    return (
      <div className={styles.self}>
        <TheContainer className={styles.content}>
          <h1 className={styles.title}>{l('app.APP_NAME')}</h1>
          <p className={styles.desc}>
            {l('app.APP_DESC')}
          </p>
        </TheContainer>
      </div>
    )
  }
}

export default HomePanel
