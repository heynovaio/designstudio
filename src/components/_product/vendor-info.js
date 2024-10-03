import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'

import { Container } from '../Components'
import * as sty from './vendor-info.module.scss'

export const VendorInfo = ({ header, description, image = null }) => {
  return (
    <section>
      <Container>
        <div className={sty.flexWrap}>
          <div className={sty.copyWrap}>
            <h2>{header}</h2>
            <p>{description}</p>
          </div>
          <div className={sty.imageWrap}>
            {image ? (
              <GatsbyImage
                image={getShopifyImage({
                  image: image,
                  width: 725,
                  height: 480,
                  layout: 'constrained',
                })}
                className={sty.image}
              />
            ) : (
              <StaticImage
                src="../../images/default_vendor.png"
                width={725}
                height={480}
                layout="constrained"
                className={sty.image}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
