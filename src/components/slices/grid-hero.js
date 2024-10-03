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
        <div
          className={`${sty.text} ${sty.text1}`}
          data-sal="slide-up"
          data-sal-delay="20"
          data-sal-easing="ease"
          data-sal-duration="350"
        >
          <p>{slice.primary.block1_subtitle}</p>
          <PrismicRichText field={slice.primary.block1_title.richText} />
          <PrismicLink
            href={`/collection/${slice.primary.block1_label}`}
            className="BtnPrimary"
          >
            {slice.primary.block1_btn_text}
            <BiArrowBack
              size={18}
              style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
            />
          </PrismicLink>
        </div>
        <GatsbyImage
          image={slice.primary.first_image?.gatsbyImageData}
          alt=""
          className={sty.image1}
        />
        <GatsbyImage
          image={slice.primary.second_image?.gatsbyImageData}
          alt=""
          className={sty.image2}
        />
        <div
          className={`${sty.text} ${sty.text2}`}
          data-sal="slide-up"
          data-sal-delay="20"
          data-sal-easing="ease"
          data-sal-duration="350"
        >
          <p>{slice.primary.block2_subtitle}</p>
          <PrismicRichText field={slice.primary.block2_title.richText} />
          <PrismicLink
            href={`/collection/${slice.primary.block2_label}`}
            className="BtnPrimary"
          >
            {slice.primary.block2_btn_text}
            <BiArrowBack
              size={18}
              style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
            />
          </PrismicLink>
        </div>
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
      block1_btn_text
      block2_btn_text
      block1_label
      block2_label
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
