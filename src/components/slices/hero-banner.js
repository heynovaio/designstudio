import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'
import { Button } from '../Components'

import * as sty from './hero-banner.module.scss'

export const HeroBanner = ({ slice }) => {

  return (
    <section className={sty.heroBanner} style={{ paddingBottom: 0 }}>
      <div className={`${sty.heroContainer} ${location.pathname === '/' ? sty.homeHero : ''}`}>
      <div className={sty.logoWrap}>
        <StaticImage
          src="../../images/designstudio_logo.png"
          width={378}
          height={182}
          layout="constrained"
          className={sty.image}
        />
      </div>
        <div className={sty.copyWrap}>
          <PrismicRichText field={slice.primary.page_title?.richText} />
          {slice.primary.callout_link && (
            <PrismicLink href={slice.primary.callout_link.url} className={sty.BtnPrimary}>
              {slice.primary.callout_label}
            </PrismicLink>
          )}
        </div>
        {slice.primary.hero_banner_image && (
          <GatsbyImage
            className={sty.heroImage}
            image={slice.primary.hero_banner_image?.gatsbyImageData}
            alt={slice.primary.hero_banner_image?.alt || ''}
            objectFit='cover'
            objectPosition='50% 50%'
            loading='eager'
            />
        )}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomeDataBodyHeroBanner on PrismicHomeDataBodyHeroBanner {
    id
    primary {
      page_title {
        richText
      }
      hero_banner_image {
        gatsbyImageData(layout: FULL_WIDTH)
        alt
      }
      callout_link {
        url
      }
      callout_label
    }
  }
  fragment PageDataBodyHeroBanner on PrismicPageDataBodyHeroBanner {
    id
    primary {
      page_title {
        richText
      }
      hero_banner_image {
        gatsbyImageData(layout: FULL_WIDTH)
        alt
      }
      callout_link {
        url
      }
      callout_label
    }
  }
`
