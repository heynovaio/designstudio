import * as React from 'react'
import { Container } from '../Components'
import { PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import * as sty from './project-description.module.scss'

export const ProjectDescription = ({ description, gallery }) => {
  return (
    <section className={sty.ProjectDescription}>
      <Container>
        {gallery && (
          <div className={sty.galleryWrap}>
            {gallery.map((item, index) => (
              <div key={`galleryItem: ${index}`}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                />
              </div>
            ))}
          </div>
        )}
        <div className={sty.Content}>
          <div className={sty.copyWrap}>
            <PrismicRichText field={description} />
          </div>
        </div>
      </Container>
    </section>
  )
}
