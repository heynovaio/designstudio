import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone, PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../components/Components'
import { Layout } from '../components/Layout'
import { components } from '../components/slices'

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

  const title = page.body[0].primary.page_title.richText[0].text;

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc} title={title}>
      <SliceZone slices={page.body} components={components} context={{lang: lang}}/>
    </Layout>
  )
}

export const query = graphql`
  query pageQuery($id: String, $lang: String) {
    prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
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
      data {
        body {
          ... on PrismicSlice {
            id
            slice_type
            slice_label
          }
          ...PageDataBodyHeroBanner
          ...PageDataBodyTextImage
          ...PageDataBodyCenteredText
          ...PageDataBodyProjectGrid
          ...PageDataBodyAlternatingTextImage
          ...PageDataBodyFacultyGrid
          ...PageDataBodyAwardsGallery
          ...PageDataBodyPressList
          ...PageDataBodyColumnCallout
        }
      }
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(PageTemplate)
