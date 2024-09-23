import * as React from 'react'
import { Container } from '../Components'
import * as sty from './new-arrivals.module.scss'
import { PrismicRichText } from '@prismicio/react'

export const NewArrivals = ({ title, arrivals }) => {
  return (
    <section className={sty.NewArrivals}>
      <Container>
        <div>
          <PrismicRichText field={title} />
        </div>
      </Container>
    </section>
  )
}
