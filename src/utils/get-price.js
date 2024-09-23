import { formatPrice } from './format-price'

export const getPrice = (location, price) => {
  const { name, currency } = location
  const convertedPrice =
    name === 'Cayman Islands' ? price * 0.83 : price

  return `${formatPrice(location.currency, convertedPrice)}
  ${currency === 'USD' ? ' USD' : ''}`
}
