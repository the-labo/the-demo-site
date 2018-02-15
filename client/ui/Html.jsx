/**
 * @class Html
 */
'use strict'

import React from 'react'
import { isProduction } from 'the-check'
import { TheBody, TheHead, TheHtml, TheRouter } from 'the-components'
import { GlobalKeys, locales, Styles, UI, Urls } from '@self/conf'
import App from './App'

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
    Urls.CSS_NORMALIZE_URL,
    Urls.CSS_THEME_URL,
    Urls.CSS_FONT_URL,
    Urls.CSS_BUNDLE_URL
  ]
  return (
    <TheHtml>
      <TheHead title={l('app.APP_NAME')}
               {...{css, js}}
               cdn={cdnUrl}
               color={Styles.DOMINANT_COLOR}
               globals={{[GlobalKeys.APP]: {}, [GlobalKeys.PROPS]: appProps}}
               icon={Urls.ICON_URL}
               version={version}
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
