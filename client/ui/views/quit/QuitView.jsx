/**
 * QuitView component
 */
'use strict'

import React from 'react'
import {
  TheButton,
  TheButtonGroup,
  TheCondition,
  TheDone,
  TheLead,
  TheView,
} from 'the-components'
import styles from './QuitView.pcss'
import { asView } from '../../wrappers'

function QuitView ({
                     busy,
                     confirm,
                     done,
                     l,
                     onCancel,
                     onConfirm,
                     onConfirmBack,
                     onExecute,
                   }) {
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={l('titles.QUIT_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={Boolean(!done && !confirm)}>
          <div>
            <div>
              <TheLead text={l('messages.QUIT_LEAD_NOTICE')}
                       title={l('leads.QUIT_LEAD')}
              />
            </div>
            <br/>
            <TheButtonGroup>
              <TheButton onClick={onCancel}>{l('buttons.DO_CANCEL')}</TheButton>
              <TheButton.Next onClick={onConfirm}
              >{l('buttons.SHOW_QUIT_CONFIRM')}</TheButton.Next>
            </TheButtonGroup>
          </div>
        </TheCondition>
        <TheCondition if={Boolean(!done && confirm)}>
          <div>
            <div>
              <TheLead title={l('leads.QUIT_CONFIRM')}
              />
            </div>
            <br/>
            <TheButtonGroup>
              <TheButton.Prev onClick={onConfirmBack}
              >{l('buttons.DO_BACK')}</TheButton.Prev>
              <TheButton onClick={onExecute}
                         primary>{l('buttons.DO_QUIT')}</TheButton>
            </TheButtonGroup>
          </div>
        </TheCondition>
        <TheCondition if={Boolean(done)}>
          <div>
            <br/>
            <TheDone linkText={l('buttons.SHOW_TOP_AGAIN')}
                     linkTo='/'
                     message={l('messages.QUIT_DONE')}
            />
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  QuitView,
  (state) => ({
    busy: state['quit.busy'],
    confirm: state['quit.confirm'],
    done: state['quit.done'],
  }),
  ({
     accountScene,
     quitScene,
   }) => ({
    onCancel: () => quitScene.goToCancel(),
    onConfirm: () => quitScene.set({confirm: true}),
    onConfirmBack: () => quitScene.set({confirm: false}),
    onExecute: async () => {
      await quitScene.doQuit()
      quitScene.set({confirm: false, done: true})
      await accountScene.doSync()
    },
    onMount: () => quitScene.init(),
  }),
  {
    onlySigned: false,
    title: ({l}) => l('titles.QUIT_TITLE'),
  }
)
