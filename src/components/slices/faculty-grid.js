import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from '../Components'
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
            imgStyle={{ objectPosition: 'right 20%' }}
          />
        </div>

        <div className={sty.grid}>
          {slice.items.map((item, index) => (
            <div className={sty.employeeCard}>
              <GatsbyImage
                image={item.image?.gatsbyImageData}
                alt={item.image?.alt || ''}
                className={sty.image}
                imgStyle={{ objectPosition: 'right 20%' }}
              />
              <div className={sty.copyWrap}>
                <span className={sty.name}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
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
