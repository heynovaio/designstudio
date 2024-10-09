import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as sty from './column-callout.module.scss'
import { Container } from '../Components'

export const ColumnCallout = ({ slice }) => {
  return (
    <section className={sty.ColumnCallout}>
      <Container>
        <div className={sty.copyWrap}>
          <p className={sty.subtitle}>{slice.primary.subtitle}</p>
          <PrismicRichText field={slice.primary.title.richText} />
        </div>
        <div className={sty.columns}>
          {slice.items.map((item) => (
            <div
              className={sty.columnContent}
              data-sal="slide-up"
              data-sal-delay="0"
              data-sal-easing="ease"
              data-sal-duration="500"
              key={item.title}
            >
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ''}
                  className={sty.image}
                />
              </div>
              <div className={sty.itemText}>
                <p className={sty.itemTitle}>{item.title}</p>
                <PrismicRichText field={item.description.richText} />
              </div>
              <PrismicLink href={item.link?.url} className="BtnPrimary">
                {item.link_label}
              </PrismicLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyColumnCallout on PrismicPageDataBodyColumnCallout {
    id
    primary {
      subtitle
      title {
        richText
      }
    }
    items {
      title
      description {
        richText
      }
      link_label
      link {
        url
      }
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
