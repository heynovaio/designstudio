import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicLink } from '@prismicio/react'
import { Container } from '../Components'

import * as sty from './instagram-feed.module.scss'

export const InstagramFeed = ({
  header,
  viewLabel,
  viewBtnLabel,
  viewBtnLink,
  media,
}) => {
  const responsive = {
    mobile: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  }
  return (
    <section>
      <Container className={sty.flex}>
        {/* <div>
          <PrismicRichText field={header.richText} />
        </div> */}
        <div
          className={sty.media}
          // data-sal="slide-up"
          // data-sal-delay="300"
          // data-sal-easing="ease"
          // data-sal-duration="750"
        >
          <span>{viewLabel}</span>
          <div className={sty.logoSoup}>
            {media.map((item, index) => (
              <div className={sty.mediaWrap} key={`media:${index}`}>
                <GatsbyImage
                  image={item.media_image?.gatsbyImageData}
                  alt={item.media_image?.alt}
                />
              </div>
            ))}
          </div>
          <PrismicLink href={viewBtnLink?.url}>{viewBtnLabel}</PrismicLink>
        </div>
      </Container>
    </section>
  )
}
