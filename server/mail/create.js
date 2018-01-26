/**
 * Create an mail instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theMail = require('the-mail').default
const env = require('../env')
const Templates = require('./Templates')
const {emailOfUser, localeDate, nameOfUser,} = require('./helpers')
const {locales} = require('@self/conf')

/** @lends create */
function create (config = env.mail) {
  const mail = theMail(config)
  const {SENDER_ADDRESS} = config

  function _render (lang, filename, vars) {
    const template = Templates[`${lang}/${filename}`] || Templates[`en/${filename}`]
    if (!template) {
      throw new Error(`Unknown template: ${filename}`)
    }
    return template(vars)
  }

  Object.assign(mail, {
    async sendGoodby ({lang, user}) {
      const l = locales.bind(lang)
      return mail.send({
        content: _render(lang, 'goodby.mail', {
          name: nameOfUser(user),
          by: l('app.APP_NAME')
        }),
        from: SENDER_ADDRESS,
        subject: l('mail.GOODBYE_SUBJECT'),
        to: emailOfUser(user),
      })
    },
    async sendRecover ({expireAt, lang, url, user,}) {
      const l = locales.bind(lang)
      return mail.send({
        content: _render(lang, 'recover.mail', {
          key: user.name,
          url,
          expireAt: localeDate(lang, expireAt),
          by: l('app.APP_NAME')
        }),
        from: SENDER_ADDRESS,
        subject: l('mail.RECOVER_SUBJECT'),
        to: emailOfUser(user),
      })
    },
    async sendVerify ({expireAt, lang, url, user,}) {
      const l = locales.bind(lang)
      return mail.send({
        content: _render(lang, 'verify.mail', {
          key: user.name,
          url,
          expireAt: localeDate(lang, expireAt),
          by: l('app.APP_NAME')
        }),
        from: SENDER_ADDRESS,
        subject: l('mail.VERIFY_SUBJECT'),
        to: emailOfUser(user),
      })
    }
  })

  return mail
}

module.exports = create
