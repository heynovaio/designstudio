import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { GoPlus } from 'react-icons/go'
import * as sty from './product-map.module.scss'

export const ProductMap = ({ image, products }) => {
  return (
    <div className={sty.ProductMap}>
      <GatsbyImage
        image={image?.gatsbyImageData}
        alt={image?.alt || ''}
        className={sty.productImage}
      />
      {products.map((item, index) => (
        <div
          className={sty.product}
          key={`product:${index}`}
          style={{
            left: `${item.item_x_value}%`,
            bottom: `${item.item_y_value}%`,
          }}
        >
          <GoPlus />
        </div>
      ))}
    </div>
  )
}
