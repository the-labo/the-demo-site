/**
 * AdminTopView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import styles from './AdminTopView.pcss'
import { Urls, Icons } from '@self/conf'


class AdminTopView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
  }

  render () {
    const s = this

    const {l} = s.props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        text={l('titles.ADMIN_TOP_TITLE')}
        />
        <TheView.Body>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonRow}>
              <TheButton className={styles.button}
                         to={Urls.ADMIN_USERS_URL}
                         icon={Icons.USERS_ICON}
                         text={l('buttons.SHOW_ADMIN_USERS')}/>
            </div>
          </div>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(AdminTopView)
