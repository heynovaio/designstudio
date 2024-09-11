import * as React from 'react'
import { Container } from '../Components'
import { PrismicRichText } from '@prismicio/react'

import * as sty from './project-hero.module.scss'

export const ProjectDescription = ({ description }) => {
  return (
    <section className={sty.ProjectDescription}>
      <Container>
        <div className={sty.Content}>
          <div className={sty.copyWrap}>
            <PrismicRichText field={description} />
          </div>
        </div>
      </Container>
    </section>
  )
}
