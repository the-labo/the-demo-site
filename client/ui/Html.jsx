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
import {
  APP_CDN_URL
} from '@self/Local'

const {APP_PROP_NAME, APP_STAGE_NAME, APP_CONTAINER_ID} = UI
const {DOMINANT_COLOR} = Styles
const u = Urls

const Html = ({appScope, renderingContext}) => {
  const {version} = appScope.pkg
  const {lang, client, store, handle, path} = renderingContext
  handle.setAttributes({store, client, l})
  const l = locales.bind(lang)
  const appProps = {
    lang
  }
  return (
    <TheHtml>
      <TheHead title={l('app.APP_NAME')}
               js={[
                 ...(isProduction() ? [
                   u.PRODUCTION_JS_URL
                 ] : [
                   u.JS_EXTERNAL_URL,
                   u.JS_BUNDLE_URL
                 ])
               ]}
               css={[
                 ...(isProduction() ? [
                   u.PRODUCTION_CSS_URL
                 ] : [
                   u.CSS_THEME_URL,
                   u.CSS_FONT_URL,
                   u.CSS_BUNDLE_URL
                 ])
               ]}
               icon={u.ICON_URL}
               version={isProduction() ? version : String(new Date().getTime())}
               globals={{[APP_PROP_NAME]: appProps}}
               color={DOMINANT_COLOR}
               cdn={isProduction() ? APP_CDN_URL : null}
               fallbackUnless={APP_STAGE_NAME}
      >
      </TheHead>
      <TheBody>
        <div id={APP_CONTAINER_ID}>
          <TheRouter.Static context={renderingContext}
                            location={path}
          >
            <App {...appProps} {...{client, store, handle}}/>
          </TheRouter.Static>
        </div>
      </TheBody>
    </TheHtml>
  )
}

export default Html
