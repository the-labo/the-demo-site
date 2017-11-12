/**
 * SignSignaskView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup, TheLead } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { Urls, Icons } from '@self/conf'
import styles from './SignSignaskView.pcss'

class SignSignaskView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const {
      l,
      back
    } = s.props
    return (
      <TheView className={styles.self}>
        <TheView.Header leftIcon={Icons.BACK_ICON}
                        leftTo={back}
                        icon={null}
                        text={l('titles.SIGNASK_VIEW_TITLE')}

        />
        <TheView.Body>
          <TheLead text={l('messages.NEEDS_SIGNIN_IN')}/>

          <br/>

          <TheButtonGroup>
            <TheButton to={Urls.SIGNIN_URL}>{l('buttons.SHOW_SIGNIN')}</TheButton>
            <TheButton to={Urls.SIGNUP_URL}
                       primary>{l('buttons.SHOW_SIGNUP')}</TheButton>
          </TheButtonGroup>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(SignSignaskView, ({l}) => l('titles.SIGNASK_VIEW_TITLE')),
  (state) => ({
    back: state['auth.signask.back'] || '/'
  })
)
