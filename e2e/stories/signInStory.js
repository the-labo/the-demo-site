'use strict'

const {GlobalExpressions} = require('../constants')
const {Urls, GlobalKeys} = require('../../conf')
const {browserAccess} = require('../helpers')
const asleep = require('asleep')

async function signUpStory (browser) {
  await browser.url(Urls.SIGN_IN_URL)

  const {
    byAttr,
    waitUntil,
    fillForm,
  } = browserAccess(browser)

  const Stateful = byAttr.bind(null, 'data-stateful-bind')

  {
    await waitUntil(GlobalExpressions.appStageExpression, 'mounted')
    await asleep(10)
    const SignInForm = Stateful('SignInForm')
    await fillForm(SignInForm, {
      name: 'demo',
      password: 'demo'
    })

    await SignInForm.element('[data-role=form-submit]').click()
  }
}

module.exports = signUpStory

if (!module.parent) {
  require('../singleton').withBrowser(module.exports)
}
