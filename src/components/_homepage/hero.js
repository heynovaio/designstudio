import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import * as sty from './hero.module.scss'

export const Hero = ({
  title,
  description,
  catalogLabel,
  worksLabel,
  gallery,
  bottom,
}) => {
  const responsive = {
    mobile: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  }
  const labels = ['Beachhouse & Sunset Drive', 'test 2']
  const [slideIndex, setSlideIndex] = React.useState(0)
  const slideLength = gallery.length
  const handleSlide = () => {
    slideIndex >= 1 ? setSlideIndex(0) : setSlideIndex(slideIndex + 1)
  }
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className={sty.carouselButtonGroup}>
        <div
          className={sty.next}
          onClick={() => {
            next()
            handleSlide()
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
    )
  }
  return (
    <section className={sty.Hero}>
      <Container>
        <div className={sty.flexWrap}>
          <div className={sty.gallery}>
            <MultiCarousel
              ssr={true}
              infinite={true}
              arrows={false}
              swipeable={true}
              responsive={responsive}
              showDots={true}
              renderDotsOutside={true}
              renderButtonGroupOutside={true}
              customButtonGroup={<ButtonGroup />}
              dotListClass={sty.dotGroup}
            >
              {gallery && (
                <div className={sty.grid}>
                  {gallery.map((item, index) => (
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image?.gatsbyImageData}
                        alt={item.image?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                  ))}
                </div>
              )}
              {gallery && (
                <div className={sty.grid}>
                  {gallery.map((item, index) => (
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image?.gatsbyImageData}
                        alt={item.image?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                  ))}
                </div>
              )}
              {gallery && (
                <div className={sty.grid}>
                  {gallery.map((item, index) => (
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image?.gatsbyImageData}
                        alt={item.image?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                  ))}
                </div>
              )}
            </MultiCarousel>
            <div className={sty.carouselNavBar}>
              <div className={sty.carouselTitle}>Beachhouse & Sunset Drive</div>
              <div className={sty.carouselCounter}>
                <b>{slideIndex + 1} </b> of {slideLength}
              </div>
            </div>
          </div>
          <div className={sty.copy}>
            {title && (
              <PrismicRichText field={title.richText} className={sty.title} />
            )}
            <p className={sty.description}>{description}</p>

            <div className={sty.btnWrap}>
              <PrismicLink href={'/'}>
                <Button>{catalogLabel}</Button>
              </PrismicLink>
              <PrismicLink href={'/'}>
                <Button variant="Secondary">{worksLabel}</Button>
              </PrismicLink>
            </div>
          </div>
        </div>
        <div className={sty.bottom}>
          <div className={sty.bottomCopy}>
            <PrismicRichText field={bottom.richText} />
          </div>
        </div>
      </Container>
    </section>
  )
}
