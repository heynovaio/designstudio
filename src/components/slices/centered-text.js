import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../Components"

import * as sty from './centered-text.module.scss';

export const CenteredText = ({ slice }) => {
  return (
    <section className="CenteredText">
      <Container>
        <div className={sty.centerWrap}>
          <PrismicRichText field={slice.primary.richtext?.richText}/>
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyCenteredText on PrismicPageDataBodyCenteredText {
    id
    primary {
      richtext {
        richText
      }
    }
  }
`