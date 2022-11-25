import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container } from "../components/components"

import * as s from './template.module.scss';

export const Template = ({ slice }) => {
  return (
    <section className="Template">
      <Container>
        
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyTemplate on PrismicHomepageDataBodyTemplate {
    id
  }
`
