/**
 * AboutPrivacyPolicyView component
 */
'use strict'

import React from 'react'
import { TheFrame, TheView } from 'the-components'
import styles from './AboutPrivacyPolicyView.pcss'
import { asView } from '../../wrappers'

class AboutPrivacyPolicyView extends React.Component {
  render () {
    const {
                                   l,
                                   lang,
    } = this.props
    
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.PRIVACY_POLICY_TITLE')}
      />
      <TheView.Body>
        <TheFrame src={`/partials/${lang}/privacy-policy.html`}/>
      </TheView.Body>
    </TheView>
  )

  }
}

export default asView(
  AboutPrivacyPolicyView,
  (state) => ({})
)
