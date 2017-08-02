/**
 * AdminTopView component
 */
'use strict'

import React from 'react'
import { TheView } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AdminTopView.pcss'

class AdminTopView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const { props } = s
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={null}
        />
        <TheView.Body>
        This is AdminTopView!
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(AdminTopView)
