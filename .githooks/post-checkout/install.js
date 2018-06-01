#!/usr/bin/env node
/**
 * Install modules
 */
'use strict'

const pon = require('../../Ponfile')
process.chdir(pon.cwd)

void async function () {
  await pon.run('pkg:install', {disableLogging: true, throwIfEmpty: true})
}()

