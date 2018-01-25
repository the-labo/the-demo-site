/**
 * AdminTopView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton } from 'the-components'
import { asView } from '../../wrappers'
import styles from './AdminTopView.pcss'
import { Urls, Icons } from '@self/conf'

function AdminTopView ({l}) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.ADMIN_TOP_TITLE')}
      />
      <TheView.Body>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonRow}>
            <TheButton className={styles.button}
                       to={Urls.ADMIN_USER_MANAGE_URL}
                       icon={Icons.USERS_ICON}
                       text={l('buttons.SHOW_ADMIN_USERS')}/>
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
    title: ({l}) => l('titles.ADMIN_TOP_TITLE'),
    onlySigned: true
  }
)
