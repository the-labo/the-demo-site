/**
 * AdminTopView component
 */
'use strict'

import { Icons, Urls } from '@self/conf'
import React from 'react'
import { TheButton, TheView } from 'the-components'
import styles from './AdminTopView.pcss'
import { asView } from '../../wrappers'

function AdminTopView ({l}) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.ADMIN_ICON}
                      text={l('titles.ADMIN_TOP_TITLE')}
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

export default asView(
  AdminTopView,
  () => ({}),
  () => ({}),
  {
    onlySigned: true,
    title: ({l}) => l('titles.ADMIN_TOP_TITLE'),
  }
)
