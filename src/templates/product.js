import * as React from 'react'
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
  };
 
  const FeaturedImage = product.featuredImage;
  const SubImgs = product.media;
  const ProductTitle = product.title;
  const Price = product.priceRange;
  const ProductDesc = product.descriptionHtml;
  const Vendor = product.vendor;
  const TotalInventory = product.totalInventory;
  const RelatedProds = product.collections[0].products.slice(0,4);
  const VendorProds = product.collections[1].products.slice(0,4);

  const temp="A chance to sell users on the story of the product or the vendors who made them so they connect with it on a deeper level. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus suspendisse faucibus interdum posuere lorem ipsum. A cras semper auctor neque vitae tempus quam. Mauris nunc congue nisi vitae suscipit tellus mauris."

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <ProductInfo 
        featuredImage={FeaturedImage}
        images={SubImgs}
        title={ProductTitle}
        description={ProductDesc}
        price={Price}
      />
      <VendorInfo header={"About this product or vendor"} description={temp}/>
      <RelatedProducts header={"Style it with"}  description={"Something like: Our designers love the look of these with this product"} products={RelatedProds}/>
      <VendorShowcase header={"Ways to style your dining room"} description={"Something like: Our designers love the look of these with this product"} products={VendorProds}/>
    </Layout>
   
  )
}

export const query = graphql`
  query productQuery($id: String) {
    shopifyProduct(id: { eq: $id }) {
      title
      descriptionHtml
      handle
      vendor
      totalInventory
      priceRange {
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
          priceRange {
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
    }
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(ProductTemplate)
