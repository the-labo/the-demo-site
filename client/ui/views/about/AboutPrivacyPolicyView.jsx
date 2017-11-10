/**
 * AboutPrivacyPolicyView component
 */
'use strict'

import React from 'react'
import { TheView, TheFrame } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutPrivacyPolicyView.pcss'

class AboutPrivacyPolicyView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const {
      l,
      lang
    } = s.props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.PRIVACY_POLICY_VIEW_TITLE')}
        />
        <TheView.Body>
          <TheFrame src={`/partials/${lang}/privacy-policy.html`}/>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(AboutPrivacyPolicyView, (state) => ({}))
