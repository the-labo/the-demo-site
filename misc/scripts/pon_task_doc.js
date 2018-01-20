#!/usr/bin/env node

/**
 * Generate pon task doc
 */
'use strict'

const {exec} = require('child_process')
const fs = require('fs')
const {promisify} = require('util')

void async function () {
  const src = require.resolve('../../Ponfile.js')
  const dest = `${__dirname}/../project/Tasks.json`
  const {stdout} = await promisify(exec)(`jsdoc -X ${src}`)
  const data = JSON.parse(String(stdout))
    .filter(({memberof}) => memberof === 'module:tasks')
    .reduce((data, {name, description}) => ({...data, [name.replace(/"/g, '')]: description}), {})

  await promisify(fs.writeFile)(dest, JSON.stringify(data, null, 2))
}()