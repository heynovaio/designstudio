import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { BiArrowBack } from 'react-icons/bi'
import { useLocation } from '@reach/router'
import { SlArrowRightCircle } from 'react-icons/sl'

import * as sty from './hero-banner.module.scss'

import { Parallax } from 'react-scroll-parallax'

export const HeroBanner = ({ slice }) => {
  const location = useLocation() // Use useLocation hook to get location object
  const [local, setLocal] = React.useState('/') // Initialize local state

  React.useEffect(() => {
    // Set local state based on the current pathname
    setLocal(location.pathname)
  }, [location.pathname]) // Dependency array, effect runs only when pathname changes

  const isReducedHeight = slice.primary.reduced_height

  return (
    <section
      className={sty.heroBanner} 
      style={{ paddingBottom: 0 }}>
      <div
        className={`${
          isReducedHeight ? sty.reducedHeroContainer : sty.heroContainer
        } ${local === '/' ? sty.homeHero : ''}`}
      >

          <div
            className={`${isReducedHeight ? sty.reducedLogoWrap : sty.logoWrap}`}
          >
            <a href="/" alt="Back to Home"
            >
              <Parallax translateY={[-110, 60]}>
                <StaticImage
                  src="../../images/designstudio_logo.png"
                  width={378}
                  height={182}
                  layout="constrained"
                  className={sty.fadeIn}
                  loading="eager"
                />
              </Parallax>
            </a>
          </div>
        <div
          data-sal="slide-up"
          data-sal-delay="0"
          data-sal-easing="ease"
          data-sal-duration="500"
          className={`${sty.copyWrap} ${isReducedHeight ? sty.reducedH1 : ''} ${
            local === '/' ? sty.homeCopy : ''
          }`}
        >
          <Parallax translateY={[-50, 50]}>
            <PrismicRichText field={slice.primary.page_title?.richText} />
          </Parallax>
          {slice.primary.callout_link && (
            <PrismicLink
              href={slice.primary.callout_link.url}
              className={`BtnPrimary ${sty.HeroBtn}`}
            >
              {slice.primary.callout_label}{' '}
              <BiArrowBack
                size={18}
                style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
              />
            </PrismicLink>
          )}
        </div>
        {slice.primary.hero_banner_image && (
          <GatsbyImage
            className={sty.heroImage}
            image={slice.primary.hero_banner_image?.gatsbyImageData}
            alt={slice.primary.hero_banner_image?.alt || ''}
            objectFit="cover"
            objectPosition="50% 50%"
            loading="eager"
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
      reduced_height
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
      reduced_height
    }
  }
  fragment ProjectDataBodyHeroBanner on PrismicProjectDataBodyHeroBanner {
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
      reduced_height
    }
  }
  fragment CatalogDataBodyHeroBanner on PrismicCatalogDataBodyHeroBanner {
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
      reduced_height
    }
  }
`
