import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import { IoIosArrowForward } from 'react-icons/io'
import MultiCarousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import * as sty from './hero.module.scss'

import { Parallax } from 'react-scroll-parallax'

export const Hero = ({
  title,
  description,
  catalogLabel,
  worksLabel,
  worksLink,
  catalogLink,
  gallery,
  bottom,
}) => {
  const responsive = {
    mobile: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  }
  const [slideIndex, setSlideIndex] = React.useState(0)
  const slideLength = gallery.length
  const handleSlide = () => {
    slideIndex + 1 >= gallery?.length
      ? setSlideIndex(0)
      : setSlideIndex(slideIndex + 1)
  }
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className={sty.carouselButtonGroup}>
        <div className={sty.carouselTitleGroup}>
          <div className={sty.carouselCounter}>
            <span className={sty.carouselTitle}>
              {gallery[slideIndex].project_name}
            </span>
            <b>{slideIndex + 1} </b> of {slideLength}
          </div>
        </div>
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
            >
              {gallery.map((item, index) => (
                <>
                  <div className={sty.grid}>
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image?.gatsbyImageData}
                        alt={item.image?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image_2?.gatsbyImageData}
                        alt={item.image_2?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                    <div key={index} className={sty.item}>
                      <GatsbyImage
                        image={item.image_3?.gatsbyImageData}
                        alt={item.image_3?.alt || ''}
                        className={sty.image}
                      />
                    </div>
                  </div>
                </>
              ))}
            </MultiCarousel>
          </div>

          <div className={sty.copy}>
            <Parallax translateY={[-20, 50]}>
              {title && <PrismicRichText field={title.richText} />}
              <p className={sty.description}>{description}</p>

              <div className={sty.btnWrap}>
                <PrismicLink href={catalogLink?.url}>
                  <Button>{catalogLabel}</Button>
                </PrismicLink>
                <PrismicLink href={worksLink?.url}>
                  <Button variant="Secondary">{worksLabel}</Button>
                </PrismicLink>
              </div>
            </Parallax>
          </div>
        </div>

        <div
          data-sal="slide-up"
          data-sal-delay="300"
          data-sal-easing="ease"
          data-sal-duration="750"
          className={sty.bottom}
        >
          <div className={sty.bottomCopy}>
            <Parallax translateY={[0, 30]}>
              <PrismicRichText field={bottom.richText} />
            </Parallax>
          </div>
        </div>
      </Container>
    </section>
  )
}
