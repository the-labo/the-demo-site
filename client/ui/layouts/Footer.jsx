/**
 * Footer component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import {
  TheFooter,
} from 'the-components'
import { Urls } from '@self/conf'
import styles from './Footer.pcss'
import { LocaleForm } from '../stateful'

@localized
class Footer extends React.Component {
  render () {
    const {
      l,
    } = this.props
    return (
      <TheFooter className={styles.self}>
        <div className={styles.inner}>
          <TheFooter.Row>
            <div>
            </div>
            <div>
              <LocaleForm/>
            </div>
          </TheFooter.Row>
          <TheFooter.Row>
            <TheFooter.CopyRight holder={l('org.ORG_NAME')}
                                 year={new Date().getFullYear()}
            />
            <TheFooter.Links>
              <TheFooter.Link to={Urls.ABOUT_PRIVACY_POLICY_URL}>
                {l('buttons.SHOW_PRIVACY_POLICY')}
              </TheFooter.Link>
              <TheFooter.Link to={Urls.ABOUT_TERMS_OF_USE_URL}>
                {l('buttons.SHOW_TERMS_OF_USE')}
              </TheFooter.Link>
            </TheFooter.Links>
          </TheFooter.Row>
        </div>
      </TheFooter>
    )

  }
}

export default stateful(

)(Footer)
