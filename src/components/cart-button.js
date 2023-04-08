import * as React from "react"
import { Link } from "gatsby"
import { BiShoppingBag } from "react-icons/bi"
import { cartButton, badge } from "./cart-button.module.scss"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <BiShoppingBag size={25} />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  )
}
