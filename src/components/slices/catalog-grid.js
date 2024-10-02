import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'
import { SlArrowRightCircle } from 'react-icons/sl'

import * as sty from './catalog-grid.module.scss'

export const CatalogGrid = ({ slice }) => {
  return (
    <section className={sty.CatalogGrid}>
      <Container>
        <div className={sty.title}>
          <p>{slice.primary.catalog_grid_subtitle}</p>
          <PrismicRichText field={slice.primary.catalog_grid_title.richText} />
        </div>
        <div>
          <div className={sty.grid}>
            {slice.items.map((item) => (
              <div className={sty.category}>
                <div className={sty.imageWrap}>
                  <GatsbyImage
                    image={item.catalog_grid_item_image?.gatsbyImageData}
                    className={sty.image}
                  />
                  <PrismicLink href={item.catalog_grid_item_link?.url}>
                    <div className={sty.overlay}>
                      <SlArrowRightCircle color="#F68623" size="55px" />
                    </div>
                  </PrismicLink>
                </div>

                <div className={sty.categoryName}>
                  <h3>{item.catalog_grid_item_name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment CatalogDataBodyCatalogGrid on PrismicCatalogDataBodyCatalogGrid {
    id
    primary {
      catalog_grid_subtitle
      catalog_grid_title {
        richText
      }
    }
    items {
      catalog_grid_item_name
      room_link_label
      catalog_grid_item_image {
        gatsbyImageData
        alt
      }
    }
  }
`
