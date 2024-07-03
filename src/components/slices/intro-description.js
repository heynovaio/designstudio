import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import { Container, Button } from '../Components'

export const IntroDescription = ({ slice }) => {
  return <Container></Container>
}

export const query = graphql`
  fragment PageDataBodyIntroDescription on PrismicPageDataBodyIntroDescription {
    id
    primary {
      intro_description_title {
        richText
      }
      intro_description_text {
        richText
      }
      intro_description_btn_label {
        richText
      }
    }
  }
`
