import * as React from 'react'
import { Link } from 'gatsby'
import { PrismicPreviewProvider } from 'gatsby-plugin-prismic-previews'
import { PrismicProvider } from '@prismicio/react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { repositoryConfigs } from './src/utils/prismicPreviews'
import { linkResolver } from './src/utils/linkResolver'

import './src/base/module.scss'
import { StoreProvider } from './src/context/store-context'

export const wrapRootElement = ({ element }) => (
  <StoreProvider>
    <ParallaxProvider>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link to={href} {...props} />
        )}
      >
        <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
          {element}
        </PrismicPreviewProvider>
      </PrismicProvider>
    </ParallaxProvider>
  </StoreProvider>
)

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta
      name="format-detection"
      content="telephone=no"
      key="format-detection"
    />,
  ])
}
