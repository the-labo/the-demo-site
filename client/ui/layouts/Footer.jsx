/**
 * Footer component
 */
'use strict'

import React from 'react'
import {
  TheFooter
} from 'the-components'
import { LocaleForm } from '../bounds'
import { Urls } from '@self/conf'
import { withLoc } from 'the-loc'
import { asPure, asBound, compose, } from 'the-hoc'
import styles from './Footer.pcss'

const Footer = compose(
  asPure,
  withLoc
)(function FooterImpl ({
                         l,
                       }) {
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
            <TheFooter.CopyRight year={2018}
                                 holder={l('org.ORG_NAME')}
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
)

export default asBound(
  Footer
)
