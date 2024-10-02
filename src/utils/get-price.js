import { formatPrice } from './format-price'

export const getPrice = (location, price) => {
  const { name, currency } = location
  const convertedPrice =
    name === 'Cayman Islands' ? price * 0.83 : price

  return `${formatPrice(currency, convertedPrice)}${currency === 'USD' ? '\u00A0USD' : ''}`
}
