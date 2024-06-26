import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { getShopifyImage } from 'gatsby-source-shopify'

import * as sty from './collections-grid.module.scss'

export const ShopByRoom = ({ gallery }) => {
  const collectionData = useStaticQuery(graphql`
    query {
      allShopifyCollection(
        filter: {
          handle: { in: ["bath", "office", "bedroom", "dining", "outdoor"] }
        }
      ) {
        nodes {
          handle
          image {
            src
          }
        }
      }
    }
  `)
  const collections = collectionData.allShopifyCollection.nodes
  function getImage(shopImg) {
    const imageData = getShopifyImage({
      shopImg,
      width: 800,
      height: 800,
      layout: 'fixed',
    })
    return imageData
  }

  return (
    <div className={sty.ShopByRoom}>
      <p>Shop Our Selection</p>
      <h2>Elevate your home with island elements</h2>
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
    </div>
  )
}
