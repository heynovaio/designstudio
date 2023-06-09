import * as React from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
  location: 'Cayman Islands'
}


export const StoreContext = React.createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`
const locationOptions = [
  'Cayman Islands',
  'Turks and Caicos',
]
const locationValues = {
  'Cayman Islands': {
    name: 'Cayman Islands',
    currency: 'KYD',
    map: {
      latitude: 19.318335803734005,
      longitude: -81.37460589408876
    },
    contact: {
      email: 'michelle@designstudio.ky',
      phone: '(345) 945.4977',
      cta: '',
      address: '48 Market St, Camana Bay, Grand Cayman, Cayman Islands'
    },
  },
  'Turks and Caicos': {
    name: 'Turks and Caicos',
    currency: 'USD',
    map: {
      latitude:  21.7881059089289,
      longitude: -72.16850038527492,
    },
    contact: {
      email: 'faye@designstudio.tc',
      phone: '(649) 941.4848',
      cta: '',
      address: 'Unit B104 Regent St, Grace Bay TKCA 1ZZ, Turks and Caicos Islands'
    }
  },
}

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout)
  const [loading, setLoading] = React.useState(false)
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false)
  

  const [location, setLocation] = React.useState(locationValues[defaultValues.location])
  function updateLocale(val) {
    if(locationOptions.includes(val)){
      setLocation(locationValues[val])
      localStorage.setItem('location',val )
    } 
  }

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }
    const initializeLocation = async () => {
      const existingLocation = isBrowser ? 
        localStorage.getItem('location')
        : null
      if (existingLocation && existingLocation !== `null`) {
        setLocation(locationValues[existingLocation])
      } else {
        localStorage.setItem('location', defaultValues.location)
        setLocation(locationValues[defaultValues.location])
      }
    }

    initializeLocation()
    initializeCheckout()
    
  }, [])

  const addVariantToCart = async (variantId, quantity) => {
    setLoading(true)

    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    const res = await client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
    setCheckout(res)
    setLoading(false)
    setDidJustAddToCart(true)
    setTimeout(() => setDidJustAddToCart(false), 3000)
  }

  const removeLineItem = async (checkoutID, lineItemID) => {
    setLoading(true)

    const res = await client.checkout
      .removeLineItems(checkoutID, [lineItemID])
    setCheckout(res)
    setLoading(false)
  }

  const updateLineItem = async (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    const res = await client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
    setCheckout(res)
    setLoading(false)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
        updateLocale,
        location,
        locationOptions,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
