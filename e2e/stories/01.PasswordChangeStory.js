'use strict'

const asleep = require('asleep')
const by = require('the-story-base/lib/by')
const c = require('./concerns')
const Story = require('./Story')
const {Urls} = require('../../conf')

const PasswordChangeStoryBase = c.compose(
  c.signOperative,
  c.accountOperative,
)(Story)

class PasswordChangeStory extends PasswordChangeStoryBase {

  async run () {
    await this.phase('In', async ({ok}) => {
      await this.operateSignIn('demo2', 'demo2')
      ok(true)
    })

    await this.phase('mypage', async ({ok}) => {
      const {l} = this
      const {title} = await this.operateShowAccountPage()
      ok(title.match(l('titles.ACCOUNT_MYPAGE_TITLE')))
    })

    await this.phase('change', async ({ok}) => {
      const {l} = this
      const {title} = await this.operateChangeAccountPassword('demo2')
    })

    await this.phase('Out', async ({ok}) => {
      await this.operateSignOut()
    })
  }
}

module.exports = PasswordChangeStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
