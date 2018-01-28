/**
 * Mail helper
 * @module helpers
 */
'use strict'

const moment = require('moment')
require('moment/locale/ja')

exports.emailOfUser = (user) => {
  const {profile} = user
  return (profile && profile.email) || user.email
}

exports.nameOfUser = (user) => {
  const {profile} = user
  return (profile && profile.name) || user.name
}

exports.localeDate = (lang, date, format = 'lll') => {
  moment.locale(lang)
  return moment(new Date(date)).format(format)
}
