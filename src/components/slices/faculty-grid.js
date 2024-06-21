import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container, Button } from '../Components'
import * as sty from './faculty-grid.module.scss'
import { PrismicRichText } from '@prismicio/react'

export const FacultyGrid = ({ slice }) => {
  return (
    <section className={sty.FacultyGrid}>
      <Container>
        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <p>{slice.primary.subtitle}</p>
          <h2>{slice.primary.title}</h2>
          <PrismicRichText field={slice.primary.description.richText} />
          <GatsbyImage
            image={slice.primary.faculty_header_image?.gatsbyImageData}
            alt={slice.primary.faculty_header_image?.alt || ''}
            className={sty.image}
          />
        </div>

        <div className={sty.grid}>
          {slice.items.map((item) => (
            <div className={sty.employeeCard}>
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                  className={sty.image}
                />
              </div>
              <span className={sty.name}>{item.name}</span>
            </div>
          ))}
        </div>

        <button>{slice.primary.button_text}</button>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyFacultyGrid on PrismicPageDataBodyFacultyGrid {
    id
    primary {
      title
      description {
        richText
      }
      subtitle
      faculty_header_image {
        gatsbyImageData
        alt
      }
      button_text
    }
    items {
      image {
        gatsbyImageData
        alt
      }
      name
    }
  }
`
