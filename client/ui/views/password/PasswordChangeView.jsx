/**
 * PasswordChangeView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheCondition, TheDone, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './PasswordChangeView.pcss'
import { PasswordChangeForm } from '../../stateful'
import { onlySigned } from '../../wrappers'

@onlySigned
@localized
@cycled
@titled(({l}) => l('titles.PASSWORD_CHANGE_TITLE'))
class PasswordChangeView extends React.Component {
  render () {
    const {
      done,
      l,
      onAgain,
      title,
      user,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={null}
                        leftIcon={Icons.BACK_ICON}
                        leftTo={Urls.ACCOUNT_MYPAGE_URL}
                        text={title}
        />
        <TheView.Body>
          <TheCondition if={done}>
            <div>
              <TheDone linkText={l('buttons.SHOW_PASSWORD_EDIT_AGAIN')}
                       linkTo={Urls.ACCOUNT_PASSWORD_URL}
                       message={l('messages.PASSWORD_UPDATE_DONE')}
                       onLinkClick={onAgain}
              />
            </div>
          </TheCondition>
          <TheCondition unless={done}>
            <div>
              <PasswordChangeForm {...{user}} />
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }
}

export default stateful(
  (state) => ({
    done: state['password.change.done'],
    user: state['account.entity'],
  }),
  ({passwordChangeScene}) => ({
    onAgain: async () => {
      passwordChangeScene.set({done: false})
    },
    onMount: () => passwordChangeScene.init(),
  }),
)(PasswordChangeView)
