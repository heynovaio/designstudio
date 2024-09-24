import * as React from 'react'
import { graphql } from 'gatsby'
import * as sty from './grid-hero.module.scss'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BiArrowBack } from 'react-icons/bi'

export const GridHero = ({ slice }) => {
  return (
    <section className={sty.GridHero}>
      <div className={sty.grid}>
        <GatsbyImage
          image={slice.primary.first_image?.gatsbyImageData}
          alt=""
        />
        <div className={sty.text}>
          <p>{slice.primary.block1_subtitle}</p>
          <PrismicRichText field={slice.primary.block1_title.richText} />
          <PrismicLink
            className="BtnPrimary"
            href={slice.primary.block1_btn_link?.url}
          >
            {slice.primary.block1_btn_label}
            <BiArrowBack
              size={18}
              style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
            />
          </PrismicLink>
        </div>
        <div className={sty.text}>
          <p>{slice.primary.block2_subtitle}</p>
          <PrismicRichText field={slice.primary.block2_title.richText} />
          <PrismicLink
            className="BtnPrimary"
            href={slice.primary.block2_btn_link?.url}
          >
            {slice.primary.block2_btn_label}
            <BiArrowBack
              size={18}
              style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
            />
          </PrismicLink>
        </div>
        <GatsbyImage
          image={slice.primary.second_image?.gatsbyImageData}
          alt=""
        />
      </div>
    </section>
  )
}

export const query = graphql`
  fragment CatalogDataBodyGridHero on PrismicCatalogDataBodyGridHero {
    id
    primary {
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
        alt
      }
      second_image {
        gatsbyImageData
        alt
      }
    }
  }
`
