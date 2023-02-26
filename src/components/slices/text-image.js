import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'
import { Button } from '../Components'

import * as sty from './text-image.module.scss'

export const TextImage = ({ slice }) => {
  return (
    <section className={sty.TextImage} style={{ paddingBottom: 0 }}>
      <Container>
        <div className={sty.FlexWrap}>
          <div className={sty.copyWrap}>
            <PrismicRichText field={slice.primary.richtext?.richText} />
            <div className={sty.buttonWrap}>
              <PrismicLink href={'/#contactUs'}>
                <Button>
                  <button>Get in touch</button>
                </Button>
              </PrismicLink>
            </div>
          </div>
          <div className={sty.imageWrap}>
            {slice.primary.image && (
              <GatsbyImage
                image={slice.primary.image?.gatsbyImageData}
                alt={slice.primary.image?.alt || ''}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyTextImage on PrismicPageDataBodyTextImage {
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
