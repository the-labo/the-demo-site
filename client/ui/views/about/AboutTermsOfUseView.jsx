/**
 * AboutTermsOfUseView component
 */
'use strict'

import React from 'react'
import { TheView, TheFrame } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutTermsOfUseView.pcss'

class AboutTermsOfUseView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const {props} = s
    const {
      l,
      lang
    } = props
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

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(AboutTermsOfUseView)
