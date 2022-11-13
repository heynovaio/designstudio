import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { components } from '../slices'

const PageTemplate = ({ data }) => {
  if (!data) return null

  const pageContent = data.prismicPage || {}
  const page = pageContent.data || {}
  const menu = data.prismicMenu || {}

  const { lang, type, url } = pageContent || {}
  const alternateLanguages = pageContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <SliceZone slices={page.body} components={components} />
    </Layout>
  )
}

export const query = graphql`
  query pageQuery($id: String, $lang: String) {
    prismicPage(id: { eq: $id },lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      id
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(PageTemplate);