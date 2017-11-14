/**
 * AboutPrivacyPolicyView component
 */
'use strict'

import React from 'react'
import { TheView, TheFrame } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutPrivacyPolicyView.pcss'

function AboutPrivacyPolicyView ({
                                   l,
                                   lang
                                 }) {
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

export default asView(
  AboutPrivacyPolicyView,
  (state) => ({})
)
