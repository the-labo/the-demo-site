'use strict'

import create from './create'
import env from '../env'
import db from '../db'
import mail from '../mail'
import conf from '../../conf'

const {locales} = conf

const singleton = create({
  locales,
  db,
  mail,
  redis: env.redis,
})

Object.assign(singleton, {
  create,
  db,
  mail,
  env
})

export default singleton
