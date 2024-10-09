import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { getShopifyImage } from 'gatsby-source-shopify'
import { Container, Button } from '../Components'
import * as sty from './related-products.module.scss'
import product from '../../templates/product'

export const RelatedProducts = ({ header, description, products = null }) => {
  function getImage(img, w, h, lay) {
    if (!img) return null
    return getShopifyImage({ image: img, width: w, height: h, layout: lay })
  }
  return (
    <section>
      <Container>
        <div className={sty.headerWrap}>
          <h2>{header}</h2>
          <p>{description}</p>
        </div>
        <div className={sty.productRow}>
          {products?.slice(0, 4).map((item, index) => (
            <PrismicLink
              className={sty.product}
              key={`product:${index}`}
              href={`/product/${item.handle}`}
            >
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={getImage(item?.featuredImage, 368, 303, 'constrained')}
                  alt=""
                  className={sty.image}
                />
              </div>
              <div className={sty.infoWrap}>
                <p>{item.title}</p>
                <span>
                  ${item.priceRangeV2.minVariantPrice.amount}{' '}
                  {item.priceRangeV2.minVariantPrice.currencyCode}
                </span>
              </div>
            </PrismicLink>
          ))}
        </div>
      </Container>
    </section>
  )
}
