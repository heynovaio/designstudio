import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import { FaChevronRight } from 'react-icons/fa'
import { Container } from '../Components'
import * as sty from './testimonials.module.scss'

export const Testimonials = ({ testimonials, ds_circle_logo }) => {
  const [slide, setSlide] = React.useState(0)
  const slideLength = testimonials.length

  const handleClick = () => {
    if (slide + 1 >= slideLength) {
      setSlide(0)
    } else {
      setSlide(slide + 1)
    }
  }
  return (
    <section className={sty.background}>
      <Container>
        <div className={sty.wrapper}>
          <div>
            <GatsbyImage
              image={ds_circle_logo?.gatsbyImageData}
              alt={ds_circle_logo?.alt || ''}
              className={sty.image}
            />
          </div>

          <div className={sty.textWrapper}>
            {testimonials.map((item, index) => (
              <div
                className={
                  index === slide ? sty.quoteWrapActive : sty.quoteWrap
                }
                key={`testimonial:${index}`}
              >
                <div className={sty.quotesHead}>
                  <p>We love what we do</p>
                  <h2>Kind Words from Clients</h2>
                </div>
                <PrismicRichText field={item.testimonial_richtext?.richText} />
                <span className={sty.author}>{item.testimonial_author}</span>
              </div>
            ))}
            <div className={sty.controlWrap}>
              <div className={sty.quoteControls}>
                <div className={sty.counter}>
                  <b>{slide + 1}</b> of {slideLength}
                </div>
                <div className={sty.dotList}>
                  {testimonials.map((item, index) => (
                    <div
                      className={index === slide ? sty.activeDot : ''}
                      onClick={() => {
                        setSlide(index)
                      }}
                      key={`dot:${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className={sty.nextBtn} onClick={handleClick}>
                <FaChevronRight />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
