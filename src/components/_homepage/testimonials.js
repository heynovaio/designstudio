import * as React from 'react'
import { GatsbyImage} from 'gatsby-plugin-image'
import { PrismicRichText} from '@prismicio/react'
import { FaChevronRight } from 'react-icons/fa'
import { Container} from '../Components'
import * as sty from './testimonials.module.scss'
import { Parallax } from 'react-scroll-parallax';

export const Testimonials = ({ testimonials, background }) => {
  const [slide, setSlide] = React.useState(0)
  const slideLength = testimonials.length
  const curTest = testimonials[slide]

  const handleClick = () => {
    if (slide + 1 >= slideLength) {
      setSlide(0)
    } else {
      setSlide(slide + 1)
    }
  }
  return (
    <section className={sty.testimonials}>
      <div className={sty.testimonialContainer} style={{ background: background}}>
        <Container className='flex'>
            <div className={sty.imageWrap}>
              <Parallax translateY={[-20, 10]}>
                <GatsbyImage
                  image={curTest.testimonial_image?.gatsbyImageData}
                  alt={curTest.testimonial_image?.alt || ''}
                  className={sty.image}
                />
              </Parallax>  
            </div>

          <div className={sty.quotes}>
            {testimonials.map((item, index) => (
              <div
                className={
                  index === slide ? sty.quoteWrapActive : sty.quoteWrap
                }
                key={`testimonial:${index}`}
              >
                <PrismicRichText field={item.testimonial_richtext?.richText} />
                <span className={sty.author}>{item.testimonial_author}</span>
              </div>
            ))}
          </div>
          <div className={sty.quoteNav}>
            <div className={sty.controlWrap}>
              <div className={sty.quoteControls}>
                <div>
                  <b>{slide + 1}</b> of {slideLength}
                </div>
                <div className={sty.dotList}>
                  {testimonials.map((item, index) => (
                    <div
                      className={index === slide ? sty.activeDot : sty.dot}
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
        </Container>
      </div>
    </section>
  )
}
