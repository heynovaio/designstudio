import * as React from 'react'
import { graphql } from 'gatsby'
import * as sty from './grid-hero.module.scss'
import { PrismicRichText } from '@prismicio/react'

export const GridHero = ({ slice }) => {
  return <div className={sty.GridHero}></div>
}

export const query = graphql`
  fragment CatalogDataBodyGridHero on PrismicCatalogDataBodyGridHero {
    id
    block1_subtitle
    block2_subtitle
    block1_title {
      richText
    }
    block2_title {
      richText
    }
    block1_btn_label
    block2_btn_label
    block1_btn_link {
      url
    }
    block2_btn_link {
      url
    }
    first_image {
      gatsbyImageData
    }
    second_image {
      gatsbyImageData
    }
  }
`
