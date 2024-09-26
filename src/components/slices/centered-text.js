import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { Container } from '../Components'

import * as sty from './centered-text.module.scss'

export const CenteredText = ({ slice }) => {
  const hasPalmImage = !!slice.primary.palm_image

  return (
    <section
      className={`${sty.CenteredText} ${hasPalmImage ? sty.palmImage : ''}`}
    >
      <div className={sty.centerContainer}>
        <Container>
          <div className={sty.centerWrap}>
            <p className={sty.title}>{slice.primary.text_title}</p>
            <PrismicRichText field={slice.primary.richtext?.richText} />
            <PrismicLink
              href={slice.primary.btn_link?.url}
              className="BtnPrimary"
              title={slice.primary.btn_label}
            >
              {slice.primary.btn_label}
            </PrismicLink>
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
      text_title
      btn_label
      btn_link {
        url
      }
      palm_image
    }
  }
`
