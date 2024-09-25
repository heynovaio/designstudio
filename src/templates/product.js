import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { Layout } from '../components/Layout'
import { ProductInfo } from '../components/_product/product-info'
import { VendorInfo } from '../components/_product/vendor-info'
import { RelatedProducts } from '../components/_product/related-products'
import { VendorShowcase } from '../components/_product/vendor-showcase'

const ProductTemplate = ({ data }) => {
  if (!data) return null

  const menu = data.prismicMenu || {}
  const product = data.shopifyProduct
  const activeDoc = {
    lang: 'en-ca',
    type: 'product',
    url: `/product/${product.handle}/`,
    alternateLanguages: null,
  }

  const RelatedProds = product.collections[0]?.products.slice(0, 4)
  const VendorProds = product.collections[1]?.products.slice(0, 4)
  const Variants = product.variants

  const temp =
    'A chance to sell users on the story of the product or the vendors who made them so they connect with it on a deeper level. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus suspendisse faucibus interdum posuere lorem ipsum. A cras semper auctor neque vitae tempus quam. Mauris nunc congue nisi vitae suscipit tellus mauris.'

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc} title={product.title}>
      <ProductInfo product={product} />
      {/* <VendorInfo header={"About this product or vendor"} description={temp}/> */}
      <RelatedProducts
        header={'Staff Featured Products'}
        products={RelatedProds}
      />
    </Layout>
  )
}

export const query = graphql`
  query productQuery($id: String) {
    shopifyProduct(id: { eq: $id }) {
      title
      description
      descriptionHtml
      handle
      vendor
      totalInventory
      storefrontId
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      collections {
        products {
          handle
          featuredImage {
            originalSrc
            width
            height
          }
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          title
        }
      }
      featuredImage {
        originalSrc
        width
        height
      }
      media {
        ... on ShopifyMediaImage {
          image {
            originalSrc
            height
            width
          }
        }
      }
      options {
        name
        values
        shopifyId
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
    }
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(ProductTemplate)
