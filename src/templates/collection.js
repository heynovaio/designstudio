import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'


const CollectionTemplate = ({ data }) => {
  if (!data) return null

  const menu = data.prismicMenu || {}
  const Collection = data.shopifyCollection
  const activeDoc = {
    lang: 'en-ca',
    type: 'Collection',
    url: `/collection/${Collection.handle}/`,
    alternateLanguages: null,
  };
 
 

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      
    </Layout>
   
  )
}

export const query = graphql`
  query CollectionQuery($id: String) {
    shopifyCollection(id: { eq: $id }) {
      handle
    }
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(CollectionTemplate)
