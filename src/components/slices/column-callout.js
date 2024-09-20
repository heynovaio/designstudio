import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'

import * as sty from './column-callout.module.scss'

export const ColumnCallout = ({ slice }) => {
  return (
    <section className={sty.ColumnCallout}>
      <div className={sty.copyWrap}>
        <p className={sty.subtitle}>{slice.primary.subtitle}</p>
        <PrismicRichText field={slice.primary.title.richText} />
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyColumnCallout on PrismicPageDataBodyColumnCallout {
    id
    primary {
      subtitle
      title {
        richText
      }
    }
    items {
      title
      description {
        richText
      }
      link_label
      link {
        url
      }
    }
  }
`
