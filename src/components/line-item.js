import * as React from 'react'
import debounce from 'lodash.debounce'
import { StoreContext } from '../context/store-context'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { FaTimesCircle } from 'react-icons/fa'
import { getPrice } from '../utils/get-price'

import {
  tableCell,
  title,
  remove,
  variant,
  totals,
  priceColumn,
} from './line-item.module.scss'

export function LineItem({ item }) {
  const { removeLineItem, checkout, updateLineItem, loading } =
    React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  const { location } = React.useContext(StoreContext)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant?.image?.src,
  }

  const price = getPrice(location, Number(item.variant.priceV2.amount))

  const subtotal = getPrice (
    location,
    Number(item.variant.priceV2.amount) * quantity,
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300,
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== '' && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  const image = React.useMemo(
    () =>
      variantImage
        ? getShopifyImage({
            image: variantImage,
            layout: 'constrained',
            crop: 'contain',
            width: 160,
            height: 160,
          })
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src],
  )

  return (
    <tr>
      <td className={tableCell}>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </td>
      <td className={tableCell}>
        <h2 className={title}>{item.title}</h2>
        <div className={variant}>
          {item.variant.title === 'Default Title' ? '' : item.variant.title}
        </div>
        <div className={remove}>
          <button onClick={handleRemove}>
            <FaTimesCircle />
            Remove
          </button>
        </div>
      </td>
      <td className={priceColumn}>{price}</td>
      <td>{quantity}</td>
      <td className={totals}>{subtotal}</td>
    </tr>
  )
}
