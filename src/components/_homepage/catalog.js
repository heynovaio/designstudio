import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import { ProductMap } from '../product-map/product-map'
import { ShopByRoom } from '../collections-grid/shop-by-room'
import * as sty from './catalog.module.scss'

import { Parallax } from 'react-scroll-parallax';

export const Catalog = ({
  description,
  image,
  products,
  background,
  gallery,
}) => {
  return (
    <section style={{ background: background }}>
      <Container>
        <div className={sty.flexWrap}>
          <div className={sty.copy}>
            <PrismicRichText field={description.richText} />
          </div>
          <Parallax translateY={[-10, 0]}>
          <ProductMap image={image} products={products} />
          </Parallax>
        </div>
        <div className={sty.gridWrap}>
          <ShopByRoom gallery={gallery} />
        </div>
      </Container>
    </section>
  )
}
