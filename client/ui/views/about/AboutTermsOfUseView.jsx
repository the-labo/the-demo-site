/**
 * AboutTermsOfUseView component
 */
'use strict'

import React from 'react'
import { TheView, TheMarkdown } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutTermsOfUseView.pcss'
import Markdowns from '../../Markdowns'

class AboutTermsOfUseView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this
    const { props } = s
    const {
      l,
      lang
    } = props
    const vars = { name: l('org.ORG_NAME') }
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.TERMS_OF_USE_VIEW_TITLE')}
        />
        <TheView.Body>
          <TheMarkdown src={Markdowns[ `${lang}/terms-of-use` ]}
                       padded
                       vars={vars}
          />
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
