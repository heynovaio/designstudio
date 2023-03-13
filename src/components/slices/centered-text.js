import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { Container } from "../Components"

import * as sty from './centered-text.module.scss';

export const CenteredText = ({ slice }) => {
  return (
    <section className={sty.CenteredText}>
      <div className={sty.centerContainer}>
        <Container>
          <div className={sty.centerWrap}>
            <PrismicRichText field={slice.primary.richtext?.richText}/>
          </div>
        </Container>
      </div>
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