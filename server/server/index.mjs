'use strict'

import create from './create'
import env from '../env'
import db from '../db'
import mail from '../mail'
import conf from '../../conf'

const singleton = create({
  locales: conf.locales,
  db,
  mail,
  redis: env.redis,
})

export default singleton

