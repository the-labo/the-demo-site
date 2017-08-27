'use strict'

import React from 'react'
import {
  TheHtml,
  TheHead,
  TheBody,
  TheRouter
} from 'the-components'
import App from './App'
import { UI, Urls, Styles, locales } from '@self/conf'
import { isProduction } from 'the-check'

const {APP_PROP_NAME, APP_CONTAINER_ID} = UI
const {DOMINANT_COLOR} = Styles
const {
  ICON_URL,
  JS_BUNDLE_URL,
  JS_BUNDLE_CC_URL,
  JS_EXTERNAL_URL,
  JS_EXTERNAL_CC_URL,
  CSS_THEME_URL,
  CSS_FONT_URL,
  CSS_BUNDLE_URL,
} = Urls

const Html = ({appScope, renderingContext}) => {
  const {version} = appScope.pkg
  const {lang, client, store, path} = renderingContext
  const l = locales.bind(lang)
  const appProps = {lang, path}
  return (
    <TheHtml>
      <TheHead js={[
        isProduction() ? JS_EXTERNAL_CC_URL : JS_EXTERNAL_URL,
        isProduction() ? JS_BUNDLE_CC_URL : JS_BUNDLE_URL
      ]}
               css={[CSS_THEME_URL, CSS_FONT_URL, CSS_BUNDLE_URL]}
               title={l('app.APP_NAME')}
               icon={ICON_URL}
               version={isProduction() ? version : String(new Date().getTime())}
               globals={{[APP_PROP_NAME]: appProps}}
               color={DOMINANT_COLOR}
      >
      </TheHead>
      <TheBody>
        <div id={APP_CONTAINER_ID}>
          <TheRouter.Static context={renderingContext}
                            location={path}
          >
            <App {...appProps} {...{client, store}}/>
          </TheRouter.Static>
        </div>
      </TheBody>
    </TheHtml>
  )
}

export default Html
export { APP_CONTAINER_ID, locales }
