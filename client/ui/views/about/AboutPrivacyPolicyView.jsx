/**
 * AboutPrivacyPolicyView component
 */
'use strict'

import React from 'react'
import { TheView, TheMarkdown } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AboutPrivacyPolicyView.pcss'
import Markdowns from '../../Markdowns'

class AboutPrivacyPolicyView extends React.Component {
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
    const vars = {
      name: l('org.ORG_NAME'),
      email: l('org.ORG_EMAIL'),
      homepage: l('org.ORG_HOMEPAGE')
    }
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.PRIVACY_POLICY_VIEW_TITLE')}
        />
        <TheView.Body>
          <TheMarkdown src={Markdowns[ `${lang}/privacy-policy` ]}
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

export default asView(AboutPrivacyPolicyView, (state) => ({}))
