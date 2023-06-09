import * as React from 'react'
import { PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'

import * as sty from './center-text.module.scss'

export const CenterText = ({ Title, Description, Btn }) => {
  return (
    <section className={sty.CenterText}>
      <div className={sty.centerContainer}>
        <Container>
          <div className={sty.centerWrap}>
            <div className={sty.copy}>
              <h1>{Title}</h1>
              <p>{Description}</p>
              <PrismicLink href={'/collection/all'}>
                <Button>{Btn}</Button>
              </PrismicLink>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
