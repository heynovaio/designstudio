import { formatPrice } from './format-price'

export const getPrice = (location, price) => {
  const { name, currency } = location
  const convertedPrice =
    name === 'Cayman Islands' ? price * 0.83 : price

    const currencyCode = currency || 'USD'

  return `${formatPrice(currencyCode, convertedPrice)}${currency === 'USD' ? '\u00A0USD' : ''}`
}
