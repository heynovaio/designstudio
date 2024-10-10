import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { BiArrowBack } from 'react-icons/bi'
import { Parallax } from 'react-scroll-parallax'
import { SlArrowRightCircle } from 'react-icons/sl'

import * as sty from './collections-grid.module.scss'

export const ShopByRoom = ({
  gallery,
  header,
  subheader,
  btnText,
  btnLink,
}) => {
  return (
    <div className={sty.ShopByRoom}>
      <div className={sty.headerText}>
        <PrismicRichText
          field={subheader?.richText}
          components={{
            paragraph: ({ children }) => (
              <h2 className={sty.headerText}>{children}</h2>
            ),
          }}
        />
      </div>

      <div className={sty.grid}>
        <div className={sty.collectionsGrid}>
          {gallery.map((item, index) => (
            <PrismicLink
              className={sty.gridItem}
              key={`collection:${index}`}
              href={`/collection/${item.room_link_label}`}
            >
              <div
                className={sty.imgContainer}
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-easing="ease"
                data-sal-duration="500"
              >
                <div className={sty.imgBox}>
                  <GatsbyImage
                    image={item.image?.gatsbyImageData}
                    alt={item.image?.alt || ''}
                  />
                  <div className={sty.overlay}>
                    <span className={sty.link}>View Products</span>
                    <SlArrowRightCircle color="#F68623" size="55px" />
                  </div>
                </div>
              </div>
              <h3>{item.room_label}</h3>
            </PrismicLink>
          ))}
        </div>
      </div>

      <div className={sty.buttonArea}>
        <div className={sty.horizontalLine}></div>

        <PrismicLink className="BtnPrimary" href={btnLink?.url}>
          <PrismicRichText field={btnText?.richText}></PrismicRichText>
          <BiArrowBack
            size={18}
            style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
          />
        </PrismicLink>

        <div className={sty.horizontalLine}></div>
      </div>
    </div>
  )
}
