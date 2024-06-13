import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Container, Button } from '../Components'

import * as sty from './press-list.module.scss'

export const PressList = ({ slice }) => {
  return (
    <section>
      <Container>
        <div className={sty.pressCol}>
          {slice.items.map((item, index) => (
            <div className={sty.pressItem} key={`press:${index}`}>
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                  className={sty.image}
                />
              </div>
              <div className={sty.copyWrap}>
                <span className={sty.source}>{item.source_name}</span>
                <p className={sty.title}>{item.article_title}</p>
                <p>{item.article_description}</p>
                <PrismicLink href={item.article_link?.url}>
                  <Button>
                    Read More &nbsp;
                    <FaLongArrowAltRight />
                  </Button>
                </PrismicLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyPressList on PrismicPageDataBodyPressList {
    id
    items {
      image {
        gatsbyImageData
        alt
      }
      source_name
      article_title
      article_description
      article_link {
        url
      }
    }
  }
`
