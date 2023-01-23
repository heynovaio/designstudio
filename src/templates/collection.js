import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { getCurrencySymbol } from "../utils/format-price"
import { SearchProvider } from "../context/search-provider"
import { useProductSearch } from "../utils/hooks"
import { getValuesFromQuery } from "../utils/search"
import { CgChevronRight, CgChevronLeft } from "react-icons/cg"
import { Layout } from '../components/Layout'
import { Container, Button } from "../components/Components"
import { Filter } from "../components/_collection/filter"
import { Search } from '../components/_collection/search'
import * as sty from "./collection.module.scss"

const DEFAULT_PRODUCTS_PER_PAGE = 24



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
  const filter = React.useState();
  const typesList = [];
  var types = Collection.products.map((prod, index) => 
      {!typesList.includes(prod.productType) && typesList.push(prod.productType);}
    );
  console.log(typesList);
  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <section style={{paddingTop: 20}}>
        <Container>
          {Collection.image && (
            <div className={sty.bannerWrap}>
            
              <GatsbyImage
                image={getShopifyImage({image: Collection.image, width: 1692, height: 326, layout: "constrained"})}
                alt=""
                className={sty.image}
              />
            </div>
          )}
          <div style={{marginBottom: 80}}>
            <h1 style={{fontSize:42, fontWeight: "600"}}>{Collection.title}</h1>
          </div>
          <div className={sty.Content}>
           
            
            <Filter context={typesList}/>
            <div className={sty.Box}>
              <Search />
              {Collection.products.length > 0 ? 
                (<div className={sty.ProductGrid}>
                  {Collection.products.map((item,index) => (
                    <PrismicLink 
                      href={`/product/${item.handle}`} 
                      key={`product:${index}`}>
                      <div className={sty.imageBox}>
                        {item.featuredImage &&
                          <GatsbyImage 
                            image={getShopifyImage({image: item.featuredImage, width: 322, height: 265, layout: "constrained"})}
                            alt=""
                            className={sty.image}
                          />
                        }
                        
                      </div>
                      <div style={{padding: "0 10px"}}>
                        <p className={sty.itemTitle}>{item.title}</p>
                        <span className={sty.price}>${item.priceRangeV2.minVariantPrice.amount} {item.priceRangeV2.minVariantPrice.currencyCode}</span>
                      </div>
                    </PrismicLink>
                  ))}
                </div>) :
                <h3>No products available</h3>
              }
            </div>
          </div> 
        </Container>
      </section>
    </Layout>
   
  )
}

export const query = graphql`
  query CollectionQuery($id: String) {
    shopifyCollection(id: { eq: $id }) {
      handle
      title
      image {
        height
        originalSrc
        width
      }
      products {
        handle
        title
        productType
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
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(CollectionTemplate)
