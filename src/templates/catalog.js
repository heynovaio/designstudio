import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { Layout } from '../components/Layout'
import { components } from '../components/slices'

const CatalogTemplate = ({ data }) => {
  if (!data) return null

  const catalogContent = data.prismicCatalog || {}
  const productsNodes = data.allShopifyProduct || {}
  const bestSellerCollections = data.allShopifyCollection?.nodes || []
  const bestSellerProducts = bestSellerCollections.flatMap(
    (collection) => collection.products || [],
  )
  const products = productsNodes.nodes || {}
  const catalog = catalogContent.data || {}
  const menu = data.prismicMenu || {}
  const home = data.prismicHome || {}

  const { lang, type, url } = catalogContent || {}
  const node = home.data
  //Using catalogByRoomGallery now to match the design shown.
  //When we change from shopify products the query for the room gallery can be removed.
  const catalogByRoomGallery = node.catalog_by_room_gallery

  const alternateLanguages = catalogContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <SliceZone
        slices={catalog.body}
        components={components}
        context={{ lang: lang }}
      />
    </Layout>
  )
}

export const query = graphql`
  query catalogQuery($id: String, $lang: String) {
    prismicCatalog(id: { eq: $id }, lang: { eq: $lang }) {
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
          ...CatalogDataBodyCatalogGrid
          ...CatalogDataBodyGridHero
          ...CatalogDataBodyHeroBanner
        }
        title
        description
        shop_btn_label
        alternating_collections {
          collection_handle
          collection_title
          collection_copy {
            richText
          }
          collection_image {
            gatsbyImageData
            alt
          }
        }
        vendor_carousel_title
        vendor_carousel {
          vendor_name
        }
        product_carousel_title
        product_carousel {
          product_handle
        }
      }
    }
    allShopifyProduct {
      nodes {
        featuredImage {
          height
          originalSrc
          width
        }
        handle
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        title
      }
    }

    allShopifyCollection(
      filter: {
        handle: {
          in: [
            "all"
            "best-sellers"
            "favourites"
            "entertain-in-style-this-fall"
          ]
        }
      }
    ) {
      nodes {
        handle
        title
        products {
          featuredImage {
            height
            originalSrc
            width
          }
          handle
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          title
        }
        image {
          height
          originalSrc
          width
        }
      }
    }

    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
    prismicHome(lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      data {
        catalog_by_room_header {
          richText
        }
        catalog_by_room_gallery {
          image {
            gatsbyImageData
            alt
          }
          room_label
          room_link_label
        }
      }
    }
  }
`

export default withPrismicPreview(CatalogTemplate)
