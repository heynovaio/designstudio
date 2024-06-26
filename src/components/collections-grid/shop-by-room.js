import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText } from '@prismicio/react'

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
            <div className={sty.imgBox}>
              <GatsbyImage
                image={item.image?.gatsbyImageData}
                alt={item.image?.alt || ''}
                className={sty.image}
              />
            </div>
            <h3>{item.room_label}</h3>
          </PrismicLink>
        ))}
      </div>
      <div className={sty.buttonArea}>
        <div className={sty.horizontalLine}></div>
        <button className={sty.viewWorkButton}>
          <PrismicRichText field={btnText.richText} />
        </button>
        <div className={sty.horizontalLine}></div>
      </div>
    </div>
  )
}
