'use strict'

const c = require('./concerns')
const Story = require('./Story')
const { Urls } = require('../../conf')

const ProfileEditStoryBase = c.compose(
  c.signOperative,
  c.accountOperative,
  c.profileOperative,
)(Story)

class ProfileEditStory extends ProfileEditStoryBase {
  async run () {
    const name = 'e2e'
    const password = 'e2e'
    const email = 'e2e@example.com'

    await this.phase('Sign in', async ({ ok }) => {
      await this.operateSignIn(name, password)
      ok(true)
    })

    await this.phase('Show mypage', async ({ ok }) => {
      const { l } = this
      const { title } = await this.operateAccountMypage()
      ok(title.match(l('titles.ACCOUNT_MYPAGE_TITLE')))
    })

    await this.phase('Update profile', async ({ ok }) => {
      await this.operateProfileChange(`[Test] new-${name}`, 'new-' + email)
    })

    await this.phase('Restore', async ({ ok }) => {
      await this.operateProfileChange(`[Test] ${name}`, email)
    })

    await this.phase('Out to Finish', async ({ ok }) => {
      await this.operateSignOut()
    })
  }
}

module.exports = ProfileEditStory

if (!module.parent) {
  require('../singleton').telStory(module.exports)
}
