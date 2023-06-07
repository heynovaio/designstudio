import * as React from 'react'
import { graphql } from 'gatsby'
import { StoreContext } from "../context/store-context"
import { Layout } from '../components/Layout'
import { formatPrice } from '../utils/format-price'
import { Container } from '../components/Components'
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
  title,
  cart,
  legend,
} from "./cart.module.scss"

export default function CartPage ({data}){
  const menu = data.prismicMenu || {}

  const { checkout, loading, location } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0
  console.log(location)
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  return (
    <Layout menu={menu?.data}>
      <section className={cart}>
  

            
          <div className={wrap}>
            {emptyCart ? (
              <div className={emptyStateContainer}>
                <h1 className={[emptyStateHeading, title].join(" ")}>Your cart is empty</h1>
                <p>
                  Looks like you haven’t found anything yet. We understand that
                  sometimes it’s hard to choose — maybe this helps:
                </p>
        
              </div>
            ) : (
              <>
                <h1 className={title}>Your cart</h1>
                <table className={table}>
                  <thead>
                    <tr className={legend}>
                      <th className={imageHeader}>Image</th>
                      <th className={productHeader}>Product</th>
                      <th className={collapseColumn}>Price</th>
                      <th>Qty.</th>
                      <th className={[totals, collapseColumn].join(" ")}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkout.lineItems.map((item) => (
                      <LineItem item={item} key={item.id} />
                      
                    ))}

                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Subtotal</td>
                      <td className={totals}>
                        {formatPrice(
                          checkout.subtotalPriceV2.currencyCode,
                          checkout.subtotalPriceV2.amount
                        )}
                      </td>
                    </tr>
                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Taxes</td>
                      <td className={totals}>
                        {formatPrice(
                          checkout.totalTaxV2.currencyCode,
                          checkout.totalTaxV2.amount
                        )}
                      </td>
                    </tr>
                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Shipping</td>
                      <td className={totals}>Calculated at checkout</td>
                    </tr>
                    <tr className={grandTotal}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Total Price</td>
                      <td className={totals}>
                        {formatPrice(
                          checkout.totalPriceV2.currencyCode,
                          checkout.totalPriceV2.amount
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
              </>
            )}
          </div>
      </section>
    </Layout>
)}
export const query = graphql`
  query cartQuery {
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`
