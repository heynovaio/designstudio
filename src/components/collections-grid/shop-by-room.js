import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { BiArrowBack } from 'react-icons/bi'

import * as sty from './collections-grid.module.scss'

export const ShopByRoom = ({ gallery, header, subheader, btnText }) => {
  return (
    <div className={sty.ShopByRoom}>
      <div className={sty.headerText}>
        <PrismicRichText field={subheader.richText} />
        <PrismicRichText field={header.richText} />
      </div>
      <div className={sty.collectionsGrid}>
        {gallery.map((item, index) => (
          <PrismicLink
            className={sty.gridItem}
            key={`collection:${index}`}
            href={`/collection/${item.room_link_label}`}
          >
            <div className={sty.imgContainer}>
              <div className={sty.imgBox}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                />
              </div>
            </div>
            <h3>{item.room_label}</h3>
          </PrismicLink>
        ))}
      </div>
      <div className={sty.buttonArea}>
        <div className={sty.horizontalLine}></div>
        <button className={sty.shopButton}>
          <span className={sty.btnContent}>
            <PrismicRichText field={btnText.richText}></PrismicRichText>
            <BiArrowBack
              size={18}
              style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
            />
          </span>
        </button>
        <div className={sty.horizontalLine}></div>
      </div>
    </div>
  )
}
