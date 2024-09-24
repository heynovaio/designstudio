import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Container, Button } from '../Components'
import { ProductCard } from '../product-card'
import { FaChevronRight } from 'react-icons/fa'

import * as sty from './product-gallery.module.scss'

export const ProductGallery = ({ Title, bestSellerProducts }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1100 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1100, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className={sty.carouselButtonGroup}>
        <button
          className={sty.next}
          onClick={() => {
            next()
          }}
        >
          <FaChevronRight size={70} />
        </button>
      </div>
    )
  }
  function productsList() {
    var prods = []
    Gallery.map((item) =>
      prods.push(Products.find((prod) => prod.handle == item.product_handle)),
    )
    return prods
  }
  function getImage(img, w, h, lay) {
    if (!img) return null
    return getShopifyImage({ image: img, layout: lay })
  }
  return (
    <section className={sty.ProductGallery}>
      <Container>
        <div className={sty.headerWrap}>
          <h2>{Title}</h2>
        </div>

        <MultiCarousel
          ssr={true}
          infinite={true}
          arrows={false}
          swipeable={true}
          responsive={responsive}
          showDots={false}
          renderButtonGroupOutside={false}
          customButtonGroup={<ButtonGroup />}
        >
          {bestSellerProducts?.map((item, index) => (
            <ProductCard
              key={`product:${index}`}
              Image={getImage(item?.featuredImage,322,265,'constrained')}
              Title={item.title}
              Price={item.priceRangeV2}
              Width={256}
              handle={item.handle}
            />
          ))}
        </MultiCarousel>
      </Container>
    </section>
  )
}
