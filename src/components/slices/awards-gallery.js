import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from '../Components'

import * as sty from './awards-gallery.module.scss'

export const AwardsGallery = ({ slice }) => {
  return (
    <section className={sty.AwardsGallery}>
      <Container>
        <div className={sty.awardRow}>
          {slice.items.map((item, index) => (
            <div key={`Award:${index}`}>
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                  className={sty.image}
                />
              </div>
              <p style={{ paddingTop: '15px' }}>{item.award}</p>
              <div style={{ paddingTop: '15px', fontSize: '18px' }}>
                <b>{item.achievement}</b>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyAwardsGallery on PrismicPageDataBodyAwardsGallery {
    id
    items {
      image {
        gatsbyImageData
        alt
      }
      award
      achievement
    }
  }
`
