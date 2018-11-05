/**
 * AdminTopView component
 */
'use strict'

import React from 'react'
import { localized, stateful, titled } from 'the-component-mixins'
import { TheButton, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './AdminTopView.pcss'
import { onlySigned } from '../../wrappers'

@stateful(
  (state) => ({}),
  ({}) => ({})
)
@onlySigned
@localized
@titled(({l}) => l('titles.ADMIN_TOP_TITLE'))
class AdminTopView extends React.Component {
  render () {
    const { l, title } = this.props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.ADMIN_ICON}
                        text={title}
        />
        <TheView.Body>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonRow}>
              <TheButton className={styles.button}
                         icon={Icons.USERS_ICON}
                         text={l('buttons.SHOW_ADMIN_USERS')}
                         to={Urls.ADMIN_USER_MANAGE_URL}/>
            </div>
          </div>
        </TheView.Body>
      </TheView>
    )
  }
}

export default AdminTopView
