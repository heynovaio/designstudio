import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone, PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from "../components/Components"
import { Layout } from '../components/Layout'
import { components } from '../components/slices'
import { CenterText } from '../components/_catalog/center-text';
import { ShopByRoom } from '../components/collections-grid/shop-by-room'
import { AlternatingTextImage } from '../components/_catalog/alternating-text-image'
import { ProductGallery } from '../components/_catalog/product-gallery'

const CatalogTemplate = ({ data }) => {
  if (!data) return null

  const catalogContent = data.prismicCatalog || {}
  const productsNodes = data.allShopifyProduct || {}
  const products = productsNodes.nodes || {}
  const catalog = catalogContent.data || {}
  const menu = data.prismicMenu || {}

  const { lang, type, url } = catalogContent || {}
  const alternateLanguages = catalogContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <CenterText 
        Title={catalog.title}
        Description={catalog.description}
        Btn={catalog.shop_btn_label}
      />
      <Container><ShopByRoom /></Container>
      
      <AlternatingTextImage 
        Sections={catalog.alternating_collections}
      />
      <ProductGallery 
        Title={catalog.product_carousel_title}
        Gallery={catalog.product_carousel}
        Products={products}
      /> 
    </Layout>
  )
}

export const query = graphql`
  query catalogQuery($id: String, $lang: String) {
    prismicCatalog(id: { eq: $id },lang: { eq: $lang }) {
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
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(CatalogTemplate);