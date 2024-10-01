import * as React from 'react'
import { graphql } from 'gatsby'
import { StoreContext } from '../context/store-context'
import { Layout } from '../components/Layout'
import { LineItem } from '../components/line-item'
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  hidden,
  title,
  cart,
  legend,
} from './cart.module.scss'
import { getPrice } from '../utils/get-price'
import { Container } from '../components/Components'

export default function CartPage({ data }) {
  const menu = data.prismicMenu || {}

  const { checkout, loading, location } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const subtotalPrice = getPrice(
    location,
    Number(checkout.subtotalPriceV2?.amount),
  )
  const taxPrice = getPrice(location, Number(checkout.totalTaxV2?.amount))
  const totalPrice = getPrice(location, Number(checkout.totalPriceV2?.amount))

  const isCayman = location.name === 'Cayman Islands'
  return (
    <Layout menu={menu?.data} title={'Your cart'}>
      <section className={cart}>
        <Container>
          <div className={wrap}>
            {emptyCart ? (
              <div className={emptyStateContainer}>
                <h1 className={title}>
                  {isCayman ? 'Your cart is empty' : 'Your wishlist is empty'}
                </h1>
                <p>
                  Looks like you haven’t found anything yet. We understand that
                  sometimes it’s hard to choose — maybe this helps:
                </p>
              </div>
            ) : (
              <>
                <h1 className={title}>
                  {isCayman ? 'Your cart' : 'Your wishlist'}
                </h1>
                <table className={table}>
                  <thead>
                    <tr className={legend}>
                      <th className={imageHeader}>Image</th>
                      <th className={productHeader}>Product</th>
                      <th className={collapseColumn}>Price</th>
                      <th>Qty.</th>
                      <th className={[totals, collapseColumn].join(' ')}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkout.lineItems.map((item) => (
                      <LineItem item={item} key={item.id} />
                    ))}

                    <tr className={grandTotal}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Total Price</td>
                      <td className={totals}>{totalPrice}</td>
                    </tr>
                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>
                        {isCayman ? '*Local Delivery' : ''}
                      </td>
                      <td className={totals}>
                        {isCayman ? 'calculated at checkout' : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {isCayman ? (
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="BtnPrimary"
                    style={{
                      marginTop: 40,
                    }}
                  >
                    Checkout
                  </button>
                ) : (
                  <button
                    onClick={() => window.print()}
                    disabled={loading}
                    className="BtnPrimary"
                    style={{
                      marginTop: 40,
                    }}
                  >
                    Print PDF
                  </button>
                )}
              </>
            )}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
export const query = graphql`
  query cartQuery {
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`
