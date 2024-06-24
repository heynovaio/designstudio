import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container, Button } from '../Components'
import * as sty from './faculty-grid.module.scss'
import { PrismicRichText } from '@prismicio/react'

export const FacultyGrid = ({ slice }) => {
  return (
    <section className={sty.FacultyGrid}>
      <div className={sty.gridHead}>
        <p>{slice.primary.subtitle}</p>
        <h2>{slice.primary.title}</h2>
        <PrismicRichText field={slice.primary.description.richText} />
      </div>
      <Container className={sty.photoContainer}>
        <GatsbyImage
          image={slice.primary.faculty_header_image?.gatsbyImageData}
          alt={slice.primary.faculty_header_image?.alt || ''}
          className={sty.image}
        />
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
      </Container>
      <div className={sty.buttonArea}>
        <div className={sty.horizontalLine}></div>
        <button className={sty.viewWorkButton}>
          {slice.primary.button_text}
        </button>
        <div className={sty.horizontalLine}></div>
      </div>
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
