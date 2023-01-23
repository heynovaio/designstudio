import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../Components"

import * as sty from './awards-gallery.module.scss';

export const AwardsGallery = ({ slice }) => {
  return (
    <section className={sty.AwardsGallery}>
      <Container>
        <div className={sty.awardRow}>
          {slice.items.map((item,index) => (
            <div className={sty.award} key={`Award:${index}`}>
              <div className={sty.imageWrap}>
                <GatsbyImage image={item.image?.gatsbyImageData} alt={item.image?.alt || ""} className={sty.image}/>
              </div>
              <p>{item.award}</p>
              <p><b>{item.achievement}</b></p>
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