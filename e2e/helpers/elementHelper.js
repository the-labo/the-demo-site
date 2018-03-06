'use strict'

const {
  Finder,
} = require('the-story-base')

module.exports = {

  asForm (form) {
    return Object.assign(form, {
      async fill (values) {
        for (const [name, val] of Object.entries(values)) {
          const input = Finder.byName(name).apply(form)
          await input.setValue(val)
        }
      },
      async submit (selector = '.the-button') {
        const Button = Finder.bySelector(selector).apply(form)
        await Button.click()
      },
    })
  },
  asGlobalHeader (header) {
    return Object.assign(header, {

    })
  },
}
