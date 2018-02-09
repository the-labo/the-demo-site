/**
 * ErrorForbiddenView component
 */
'use strict'

import React from 'react'
import { TheButton, TheButtonGroup, TheLead, TheRoute, TheView } from 'the-components'
import styles from './ErrorForbiddenView.pcss'
import { asView } from '../../wrappers'

class ErrorForbiddenView extends React.Component {
  render () {
    const {l} = this.props
    
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={null}
      />
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

export default asView(
  ErrorForbiddenView,
  (state) => ({}),
  ({}) => ({}),
  {
    title: ({l}) => l('titles.ERROR_NOTFOUND_TITLE'),
  }
)
