import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'

import * as sty from './alternating-text-image.module.scss'

export const AlternatingTextImage = ({ slice }) => {
  const starter = slice.primary.first_image_side ? 1 : 0

  const Image = ({ image }) => (
    <div className={sty.imageWrap}>
      {image && (
        <GatsbyImage image={image?.gatsbyImageData} alt={image?.alt || ''} />
      )}
    </div>
  )
  const Copy = ({ text }) => (
    <div className={sty.copyWrap}>
      <PrismicRichText field={text?.richText} />
    </div>
  )
  return (
    <section className={sty.AlternatingTextImage}>
      <div className={sty.circleContainer}>
        <Container className='flex'>
          {slice.items.map((item, index) => (
            <div className={sty.FlexWrap} key={`text-image:${index}`}>
              {index % 2 === starter ? (
                <>
                  <Image image={item.image} />
                  <Copy text={item.text} />
                </>
              ) : (
                <>
                  <Copy text={item.text} />
                  <Image image={item.image} />
                </>
              )}
            </div>
          ))}
        </Container>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyAlternatingTextImage on PrismicPageDataBodyAlternatingTextImage {
    id
    primary {
      first_image_side
    }
    items {
      image {
        gatsbyImageData
        alt
      }
      text {
        richText
      }
    }
  }
`
