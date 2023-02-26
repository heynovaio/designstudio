import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { formatPrice } from '../utils/format-price'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'

import * as sty from './product-card.module.scss'

export const ProductCard = ({ Image, Title, Price, Width: number, handle }) => {
  const price = formatPrice(
    Price.minVariantPrice?.currencyCode,
    Price.minVariantPrice?.amount,
  )
  return (
    <div className={sty.ProductCard}>
      <PrismicLink href={`./product/${handle}`}>
        <div className={sty.imageWrap}>
          {Image && (
            <GatsbyImage
              style={{ border: '1px solid black', borderRadius: '2.5%' }}
              className={sty.image}
              image={Image}
              alt={''}
            />
          )}
        </div>
      </PrismicLink>
      <p className={sty.title}>{Title}</p>
      <p>{price}</p>
    </div>
  )
}
