/**
 * @class Html
 */
'use strict'

import React from 'react'
import { TheHtml, TheHead, TheBody, TheRouter, } from 'the-components'
import App from './App'
import { UI, GlobalKeys, Urls, Styles, locales, } from '@self/conf'
import { isProduction, } from 'the-check'

/** @lends Html */
function Html ({appScope, renderingContext}) {
  const {
    cdnUrl,
    version,
  } = appScope
  const {client, handle, lang, path, store} = renderingContext
  const l = locales.bind(lang)
  handle.setAttributes({client, l, lang, store})
  const appProps = {
    lang,
  }
  const js = isProduction() ? [
    Urls.PRODUCTION_JS_URL
  ] : [
    Urls.JS_EXTERNAL_URL,
    Urls.JS_BUNDLE_URL
  ]
  const css = isProduction() ? [
    Urls.PRODUCTION_CSS_URL
  ] : [
    Urls.CSS_THEME_URL,
    Urls.CSS_FONT_URL,
    Urls.CSS_BUNDLE_URL
  ]
  return (
    <TheHtml>
      <TheHead title={l('app.APP_NAME')}
               {...{css, js}}
               icon={Urls.ICON_URL}
               version={version}
               globals={{[GlobalKeys.APP]: {}, [GlobalKeys.PROPS]: appProps}}
               color={Styles.DOMINANT_COLOR}
               cdn={cdnUrl}
      >
      </TheHead>
      <TheBody>
        <div id={UI.APP_CONTAINER_ID}>
          <TheRouter.Static context={renderingContext}
                            location={path}
          >
            <App {...appProps} {...{client, handle, store}}/>
          </TheRouter.Static>
        </div>
      </TheBody>
    </TheHtml>
  )
}

export default Html
