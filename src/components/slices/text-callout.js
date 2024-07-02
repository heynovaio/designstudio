import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import { Container, Button } from '../Components'
import * as sty from './text-callout.module.scss'

export const TextCallout = ({ slice }) => {
  return (
    <Container>
      <PrismicRichText render={text_callout_title.richText} />
    </Container>
  )
}

export const query = graphql`
  fragment HomeDataBodyTextCallout on PrismicHomeDataBodyTextCallout {
    id
    primary {
      text_callout_title
      text_callout_text {
        richText
      }
      text_callout_btn_label {
        richText
      }
      text_callout_palm
    }
  }
`
