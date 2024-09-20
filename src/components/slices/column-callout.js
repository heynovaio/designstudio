import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'

import * as sty from './column-callout.module.scss'

export const ColumnCallout = ({ slice }) => {
  return <div></div>
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
