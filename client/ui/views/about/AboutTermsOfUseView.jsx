/**
 * AboutTermsOfUseView component
 */
'use strict'

import React from 'react'
import { TheFrame, TheView } from 'the-components'
import styles from './AboutTermsOfUseView.pcss'
import { asView } from '../../wrappers'

function AboutTermsOfUseView ({
                                l,
                                lang,
                              }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.TERMS_OF_USE_TITLE')}
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
