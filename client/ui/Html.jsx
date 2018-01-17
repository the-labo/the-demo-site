/**
 * @class Html
 */
'use strict'

import React from 'react'
import { TheHtml, TheHead, TheBody, TheRouter, } from 'the-components'
import App from './App'
import { expand } from 'objnest'
import { UI, Urls, Styles, locales, } from '@self/conf'
import { isProduction, } from 'the-check'

/** @lends Html */
function Html ({appScope, renderingContext}) {
  const {
    pkg: {version},
    APP_CDN_URL,
  } = appScope
  const {lang, client, store, handle, path} = renderingContext
  const l = locales.bind(lang)
  handle.setAttributes({store, client, l, lang})
  const appProps = {
    lang
  }
  const js = isProduction() ? [
    Urls.PRODUCTION_JS_URL
  ] : [
    Urls.JS_EXTERNAL_URL,
    Urls.JS_BUNDLE_URL
  ]
  return (
    <TheHtml>
      <TheHead title={l('app.APP_NAME')}
               css={[
                 ...(isProduction() ? [
                   Urls.PRODUCTION_CSS_URL
                 ] : [
                   Urls.CSS_THEME_URL,
                   Urls.CSS_FONT_URL,
                   Urls.CSS_BUNDLE_URL
                 ])
               ]}
               icon={Urls.ICON_URL}
               version={isProduction() ? version : String(new Date().getTime())}
               globals={expand({[UI.APP_PROP_NAME]: appProps})}
               color={Styles.DOMINANT_COLOR}
               cdn={isProduction() ? APP_CDN_URL : null}
      >
      </TheHead>
      <TheBody>
        <div id={UI.APP_CONTAINER_ID}>
          <TheRouter.Static context={renderingContext}
                            location={path}
          >
            <App {...appProps} {...{client, store, handle}}/>
          </TheRouter.Static>
        </div>
        {js.map((src) => (<script key={src} src={src} defer/>))}
      </TheBody>
    </TheHtml>
  )
}

export default Html
