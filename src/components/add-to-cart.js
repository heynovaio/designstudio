import * as React from "react"
import { StoreContext } from "../context/store-context"
import { addToCart as addToCartStyle } from "./add-to-cart.module.scss"

export function AddToCart({ variantId, quantity, available, ...props }) {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type="submit"
      className="BtnPrimary"
      onClick={addToCart}
      disabled={!available || loading || props.disabled}
      {...props}
      style = {{
        cursor: 'pointer'
      }}
    >
      {available ? "Add to Cart" : "Out of Stock"}
    </button>
  )
}
