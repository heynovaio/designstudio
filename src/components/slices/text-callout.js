import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import { Container, Button } from '../Components'
import * as sty from './text-callout.module.scss'

export const TextCallout = ({ slice }) => {
  return (
    <Container>
      <PrismicRichText field={slice.primary.text_callout_text.richText} />
    </Container>
  )
}

export const query = graphql`
  fragment HomeDataBodyTextCallout on PrismicHomeDataBodyTextCallout {
    id
    primary {
      text_callout_title {
        richText
      }
      text_callout_text {
        richText
      }
      text_callout_btn_label {
        richText
      }
      text_callout_palm
    }
  }
  fragment PageDataBodyTextCallout on PrismicPageDataBodyTextCallout {
    id
    primary {
      text_callout_title {
        richText
      }
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
