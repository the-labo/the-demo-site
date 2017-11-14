/**
 * AboutTermsOfUseView component
 */
'use strict'

import React from 'react'
import { TheView, TheFrame } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutTermsOfUseView.pcss'

function AboutTermsOfUseView ({
                                l,
                                lang
                              }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.TERMS_OF_USE_VIEW_TITLE')}
      />
      <TheView.Body>
        <TheFrame src={`/partials/${lang}/privacy-policy.html`}/>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  AboutTermsOfUseView
)
