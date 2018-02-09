/**
 * ErrorForbiddenView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheButton, TheButtonGroup, TheLead, TheRoute, TheView } from 'the-components'
import styles from './ErrorForbiddenView.pcss'

@localized
@titled(({l}) => l('titles.ERROR_NOTFOUND_TITLE'))
class ErrorForbiddenView extends React.Component {
  render () {
    const {l} = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Body>
          <TheRoute.Status code={403}>
            <br/>
            <TheLead title={l('messages.YOU_ARE_FORBIDDEN')}>
            </TheLead>
            <br/>
            <div>
              <TheButtonGroup>
                <TheButton href='/'>{l('buttons.SHOW_TOP_AGAIN')}</TheButton>
              </TheButtonGroup>
            </div>
          </TheRoute.Status>
        </TheView.Body>
      </TheView>
    )

  }
}

export default stateful(
  (state) => ({}),
  ({}) => ({}),
)(ErrorForbiddenView)
