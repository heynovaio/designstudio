import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container } from '../Components'
import { SlArrowRightCircle } from 'react-icons/sl'

import * as sty from './project-grid.module.scss'

export const ProjectGrid = ({ slice }) => {
  const data = useStaticQuery(graphql`
    query {
      allPrismicProject {
        nodes {
          uid
          tags
          data {
            banner_image {
              gatsbyImageData
              alt
            }
            project_name
          }
        }
      }
    }
  `)
  const products = data.allPrismicProject?.nodes || {}
  function tagProd(tag) {
    return products.filter(
      (prod) => prod.tags[0]?.toLowerCase() == tag.toLowerCase(),
    )
  }

  return (
    <section className={sty.Title}>
      <Container>
        {slice.items.map((item, index) => (
          <div key={`tag:${index}`}>
            <div className={sty.headerText}>
              <PrismicRichText field={item.project_subtitle.richText} />
              <PrismicRichText field={item.project_title.richText} />
            </div>
            <div className={sty.grid}>
              {tagProd(item.project_tag).map((prod, index) => (
                <div className={sty.project} key={`prod:${index}`}>
                  <PrismicLink
                    className={sty.imageWrap}
                    href={`/project/${prod.uid}`}
                  >
                    <GatsbyImage
                      image={prod.data.banner_image?.gatsbyImageData}
                      alt=""
                      className={sty.image}
                    />
                    <div className={sty.overlay}>
                      <p>{prod.data.project_name}</p>
                      <PrismicLink
                        href={`/project/${prod.uid}`}
                        className={sty.link}
                      >
                        View Project
                      </PrismicLink>
                      <SlArrowRightCircle color="#F68623" size="55px" />
                    </div>
                  </PrismicLink>
                  <div className={sty.copyWrap}>
                    <h3>{prod.data.project_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyProjectGrid on PrismicPageDataBodyProjectGrid {
    id
    items {
      project_tag
      max_projects
      project_title {
        richText
      }
      project_subtitle {
        richText
      }
    }
  }
`
