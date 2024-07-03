import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import { Container, Button } from '../Components'
import * as sty from './intro-description.module.scss'
import { BiArrowBack } from 'react-icons/bi'

export const IntroDescription = ({ slice }) => {
  return (
    <div className={sty.introBox}>
      <div className={sty.textBox}>
        <div className={sty.titleText}>
          <PrismicRichText
            field={slice.primary.intro_description_title.richText}
          />
        </div>

        <div className={sty.bodyText}>
          <PrismicRichText
            field={slice.primary.intro_description_text.richText}
          />
        </div>
      </div>

      <div className={sty.buttonArea}>
        <button className={sty.viewWorkButton}>
          <span className={sty.btnContent}>
            <PrismicRichText
              field={slice.primary.intro_description_btn_label.richText}
            />
            <BiArrowBack
              size={18}
              style={{
                transform: 'scaleX(-1)',
                marginLeft: '0.5em',
              }}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment PageDataBodyIntroDescription on PrismicPageDataBodyIntroDescription {
    id
    primary {
      intro_description_title {
        richText
      }
      intro_description_text {
        richText
      }
      intro_description_btn_label {
        richText
      }
    }
  }
  fragment HomeDataBodyIntroDescription on PrismicHomeDataBodyIntroDescription {
    id
    primary {
      intro_description_title {
        richText
      }
      intro_description_text {
        richText
      }
      intro_description_btn_label {
        richText
      }
    }
  }
`
