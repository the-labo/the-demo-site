/**
 * ErrorNotfoundView component
 */
'use strict'

import React from 'react'
import { TheView, TheRoute } from 'the-components'
import { asView } from '../../wrappers'
import styles from './ErrorNotfoundView.pcss'

class ErrorNotfoundView extends React.Component {
  render () {
    const s = this
    const { props } = s
    const { l } = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={null}
        />
        <TheView.Body>
          <TheRoute.Status code={404}>
            <div>
              <h3>{l('messages.PAGE_NOT_FOUND')}</h3>
              <div>
              </div>
            </div>
          </TheRoute.Status>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {

  }

  componentWillUnmount () {
  }
}

export default asView(ErrorNotfoundView)
