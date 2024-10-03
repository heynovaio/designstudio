import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from '../Components'
import * as sty from './faculty-grid.module.scss'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { BiArrowBack } from 'react-icons/bi'

export const FacultyGrid = ({ slice }) => {
  return (
    <section className={sty.FacultyGrid}>
      <div className={sty.facultyHead}>
        <p className={sty.headSubtitle}>{slice.primary.subtitle}</p>
        <PrismicRichText field={slice.primary.faculty_title.richText} />
        <PrismicRichText field={slice.primary.description.richText} />
      </div>
      <div className={sty.imageSection}>
        <Container className={sty.photoContainer}>
          <GatsbyImage
            image={slice.primary.faculty_header_image?.gatsbyImageData}
            alt={slice.primary.faculty_header_image?.alt || ''}
            className={sty.headImage}
          />
          <div className={sty.facultyMembers}>
            {slice.items.map((item) => (
              <div
                className={sty.employeeCard}
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-easing="ease"
                data-sal-duration="500"
              >
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
      </div>
      <div className={sty.buttonArea}>
        <div className={sty.horizontalLine}></div>
        <PrismicLink className="BtnPrimary" href="/">
          {slice.primary.button_text}
          <BiArrowBack
            size={18}
            style={{ transform: 'scaleX(-1)', marginLeft: '0.5em' }}
          />
        </PrismicLink>
        <div className={sty.horizontalLine}></div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyFacultyGrid on PrismicPageDataBodyFacultyGrid {
    id
    primary {
      faculty_title {
        richText
      }
      description {
        richText
      }
      subtitle
      faculty_header_image {
        gatsbyImageData
        alt
      }
      button_text
      button_link {
        url
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
