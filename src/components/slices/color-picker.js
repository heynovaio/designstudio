import * as React from 'react'
import { graphql } from 'gatsby'
import * as sty from './color-picker.module.scss'
import { PrismicRichText } from '@prismicio/react'

export const ColorPicker = ({ slice }) => {
  return (
    <div className={sty.colorStoryContainer}>
      <div className={sty.titleText}>
        <PrismicRichText field={slice.primary.color_picker_title.richText} />
      </div>
      <div className={sty.colors}>
        {slice.items.map((item, index) => (
          <div
            key={index}
            className={sty.colorCircle}
            style={{ backgroundColor: item.color_picker_color }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  fragment PageDataBodyColorPicker on PrismicPageDataBodyColorPicker {
    id
    primary {
      color_picker_title {
        richText
      }
    }
    items {
      color_picker_color
    }
  }
  fragment HomeDataBodyColorPicker on PrismicHomeDataBodyColorPicker {
    id
    primary {
      color_picker_title {
        richText
      }
    }
    items {
      color_picker_color
    }
  }
  fragment ProjectDataBodyColorPicker on PrismicProjectDataBodyColorPicker {
    id
    primary {
      color_picker_title {
        richText
      }
    }
    items {
      color_picker_color
    }
  }
`
