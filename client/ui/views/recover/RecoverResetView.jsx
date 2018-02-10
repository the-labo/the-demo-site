/**
 * RecoverResetView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheCondition, TheDone, TheLead, TheView } from 'the-components'
import styles from './RecoverResetView.pcss'
import { RecoverResetForm } from '../../stateful'

@localized
@titled(({l}) => l('leads.RECOVER_RESET'))
class RecoverResetView extends React.Component {
  render () {
    const {
      done,
      failure,
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={null}
        />
        <TheView.Body>
          <TheLead error={failure}
                   title={title}
          />
          <TheCondition if={done}>
            <TheDone linkText={l('buttons.SHOW_TOP_AGAIN')}
                     linkTo='/'
                     message={l('messages.RECOVER_RESET_DONE')}/>
          </TheCondition>
          <TheCondition unless={done}>
            <RecoverResetForm/>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )

  }
}

export default stateful(
  (state) => ({
    busy: state['recover.reset.busy'],
    done: state['recover.reset.done'],
    failure: state['recover.reset.failure'],
    query: state['app.query'],
  }),
  ({propsProxy, recoverResetScene}) => ({
    onMount: () => {
      recoverResetScene.init()
      const {envelop, seal} = propsProxy.query
      recoverResetScene.setEntry({envelop, seal})
    },
  })
)(RecoverResetView)
