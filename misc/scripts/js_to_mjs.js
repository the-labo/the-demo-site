#!/usr/bin/env node

/**
 * Change extensions
 * @example
 *  `$ ./misc/scripts/js_to_mjs.js "server/controllers/*.js"
 */
'use strict'

const aglob = require('aglob')
const fs = require('fs')
const {EOL} = require('os')
const path = require('path')
const [, , pattern, ext = '.mjs'] = process.argv

void async function run () {
  const cwd = process.cwd()
  for (const filename of await aglob(pattern, {cwd})) {
    const src = path.resolve(cwd, filename)
    const dest = path.resolve(
      path.dirname(src),
      path.basename(src, path.extname(src)) + ext
    )
    fs.renameSync(src, dest)

    {
      fs.chmodSync(dest, '644')
      const data = String(fs.readFileSync(dest))
      fs.writeFileSync(dest, data.split(EOL).map((line) => {
        const requirePattern = /const (.*?) = require\((.*)\)/
        if (requirePattern.test(line)) {
          return line.replace(requirePattern, ($0, $1, $2) =>
            `import ${$1} from ${$2}`
          )
        }
        const exportsPattern = 'module.exports = '
        if (exportsPattern.test(line)) {
          return line.replace(exportsPattern, 'export default ')
        }
        return line
      }).join(EOL))
    }
    console.log(`Convert ${path.relative(cwd, src)} -> ${path.relative(cwd, dest)}`)
  }
}().catch((e) => console.error(e))
