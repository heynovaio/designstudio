import * as React from 'react'
import { Container } from '../Components'

import * as sty from './project-hero.module.scss'

export const ProjectHero = ({ Tags, Name, Type, Moment }) => {
  return (
    <section className={sty.ProjectHero}>
      <Container>
        <div className={sty.Content}>
          <div className={sty.copyWrap}>
            <span className={sty.tag}>{Tags.map((tag) => tag)}</span>
            <h2>{Name}</h2>
            {Type && (
              <p>
                <b>Project Type:</b> {Type}
              </p>
            )}
            {Moment && (
              <p>
                <b>Favorite Moment:</b> {Moment}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
