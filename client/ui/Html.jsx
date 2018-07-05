/**
 * @class Html
 */
'use strict'

import React from 'react'
import { isProduction } from 'the-check'
import { TheBody, TheHead, TheHtml, TheRouter } from 'the-components'
import { resolveUrl } from 'the-site-util'
import { GlobalKeys, locales, SrcSets, Styles, UI, Urls } from '@self/conf'
import App from './App'

/** @lends Html */
function Html ({appScope, renderingContext}) {
  const {
    buildNumber,
    cdnUrl,
    version,
  } = appScope
  const {client, handle, info, lang, path, store} = renderingContext
  const l = locales.bind(lang)
  handle.setAttributes({client, l, lang, store})
  const appProps = {
    lang,
  }
  const js = [
    ...SrcSets.jsSet,
    ...(isProduction() ? [
      Urls.PRODUCTION_JS_URL,
    ] : [
      Urls.JS_BUNDLE_URL,
    ]),
  ]
  const css = [
    ...SrcSets.cssSet,
    ...(
      isProduction() ? [
        Urls.PRODUCTION_CSS_URL
      ] : [
        Urls.CSS_BUNDLE_URL
      ]
    )
  ]
  return (
    <TheHtml>
      <TheHead title={l('app.APP_NAME')}
               {...{css, js}}
               cdn={cdnUrl}
               color={Styles.DOMINANT_COLOR}
               globals={{
                 [GlobalKeys.APP]: {}, [GlobalKeys.PROPS]: appProps, [client.infoKey]: info,
               }}
               icon={Urls.ICON_URL}
               manifest={resolveUrl(Urls.MANIFEST_URL, {lang})}
               version={[version, buildNumber].join('-')}
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
