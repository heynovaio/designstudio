import * as React from 'react'
import { Link } from 'gatsby'
import { BiShoppingBag } from 'react-icons/bi'
import { cartButton, badge, animateBadge } from './cart-button.module.scss'

export function CartButton({ quantity }) {
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    if (quantity > 0) {
      setIsAnimating(true)
      const timeout = setTimeout(() => setIsAnimating(false), 400)
      return () => clearTimeout(timeout)
    }
  }, [quantity])

  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart"
      className={cartButton}
    >
      <BiShoppingBag size={25} />
      {quantity > 0 && (
        <div className={`${badge} ${isAnimating ? animateBadge : ''}`}>
          {quantity}
        </div>
      )}
    </Link>
  )
}
