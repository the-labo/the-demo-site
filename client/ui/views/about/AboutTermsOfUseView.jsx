/**
 * AboutTermsOfUseView component
 */
'use strict'

import React from 'react'
import { localized, stateful, titled } from 'the-component-mixins'
import { TheFrame, TheView } from 'the-components'
import styles from './AboutTermsOfUseView.pcss'

@localized
@titled(({l}) => l('titles.TERMS_OF_USE_TITLE'))
class AboutTermsOfUseView extends React.Component {
  render () {
    const {
      l,
      lang,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={title}
        />
        <TheView.Body>
          <TheFrame src={`/partials/${lang}/privacy-policy.html`}/>
        </TheView.Body>
      </TheView>
    )

  }
}

export default stateful()(
  AboutTermsOfUseView
)
