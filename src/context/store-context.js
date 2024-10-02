import React, { useState, useEffect } from 'react';
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

const locations = [
  {
    name: 'Cayman Islands',
    abr: 'KY',
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
  {
    name: 'Turks and Caicos',
    abr: 'TC',
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
]

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [loading, setLoading] = useState(false)
  const [didJustAddToCart, setDidJustAddToCart] = useState(false)
  const [location, setLocation] = useState(locations.find(loc => loc.name === defaultValues.location));
  
  const updateLocale = (val) => {
    const newLocation = locations.find(loc => loc.name === val);
    if (newLocation) {
      setLocation(newLocation);
      if (isBrowser) {
        localStorage.setItem('location', val);
      }
    }
  };

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser ? localStorage.getItem(localStorageKey) : null;
      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(existingCheckoutID);
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout);
            return; // Ensure this return is within the async function
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null);
        }
      }
  
      const newCheckout = await client.checkout.create();
      setCheckoutItem(newCheckout);
    };
  
    const initializeLocation = async () => {
      const existingLocation = isBrowser ? localStorage.getItem('location') : null;
      if (existingLocation && existingLocation !== `null`) {
        const newLocation = locations.find(loc => loc.name === existingLocation);
        if (newLocation) {
          setLocation(newLocation);
        }
      }  else {
        localStorage.setItem('location', defaultValues.location);
        setLocation(locations.find(loc => loc.name === defaultValues.location));
      }
    };
  
    initializeLocation();
    initializeCheckout();
  }, []);
  
  const addVariantToCart = async (variantId, quantity) => {
    setLoading(true);
  
    const checkoutID = checkout.id;
  
    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
  
    const res = await client.checkout.addLineItems(checkoutID, lineItemsToUpdate);
    setCheckout(res);
    setLoading(false);
    setDidJustAddToCart(true);
    setTimeout(() => setDidJustAddToCart(false), 3000);
  };
  
  const removeLineItem = async (checkoutID, lineItemID) => {
    setLoading(true);
  
    const res = await client.checkout.removeLineItems(checkoutID, [lineItemID]);
    setCheckout(res);
    setLoading(false);
  };

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
        locations
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
