import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'
import { Button } from '../Components'

import * as sty from './text-image.module.scss'

export const HeroBanner = ({ slice }) => {
  return (
    <section className={sty.HeroBanner} style={{ paddingBottom: 0 }}>
      <Container className="flex">
        <div className={sty.copyWrap}>
          <PrismicRichText field={slice.primary.richtext?.richText} />
          <PrismicLink href={'/#contactUs'} className={sty.BtnPrimary}>
            Get in touch
          </PrismicLink>
        </div>
        <div className={sty.imageWrap}>
          {slice.primary.image && (
            <GatsbyImage
              image={slice.primary.image?.gatsbyImageData}
              alt={slice.primary.image?.alt || ''}
            />
          )}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment HomeDataBodyHeroBanner on PrismicHomeDataBodyHeroBanner {
    id
    primary {
      richtext {
        richText
      }
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
