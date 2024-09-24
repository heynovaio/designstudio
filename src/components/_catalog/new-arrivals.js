import * as React from 'react'
import { Container } from '../Components'
import * as sty from './new-arrivals.module.scss'
import { PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'

export const NewArrivals = ({ title, arrivals }) => {
  return (
    <section className={sty.NewArrivals}>
      <Container>
        <div className={sty.title}>
          <PrismicRichText field={title} />
        </div>
        <div className={sty.imageGroup}>
          {arrivals.map((arrival, index) => (
            <div className={sty.arrival} key={index}>
              <GatsbyImage
                image={arrival.new_arrival_image.gatsbyImageData}
                className={sty.image}
              />
              <p>{arrival.new_arrival_name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
