import * as React from 'react'
import { Container } from '../Components'
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as sty from './contact.module.scss'
import { StoreContext } from '../../context/store-context'

export const Contact = ({ marker, header, description, cta, email, phone }) => {
  const { location } = React.useContext(StoreContext)
  const { map: mapCoords, contact, name } = location || {}
  const [viewState, setViewState] = React.useState({
    latitude: marker?.latitude,
    longitude: marker?.longitude,
    zoom: 14.5,
  })
  React.useEffect(
    () =>
      setViewState({
        latitude: mapCoords?.latitude,
        longitude: mapCoords?.longitude,
        zoom: 14.5,
      }),
    [location],
  )
  return (
    <section id="contactUs">
      <Container className="flex">
        <div className={sty.copy}>
          <h2>Contact Us at {name}</h2>
          <p className={sty.description}>{description}</p>
          <div>
            <div className={sty.info}>
              <p>
                <FaEnvelope /> {contact?.email}
              </p>
            </div>
            <div className={sty.info}>
              <p>
                <FaPhoneAlt /> {contact?.phone}
              </p>
            </div>
            <div className={sty.info}>
              <p>
                <FaMapMarkerAlt />
                {contact?.address}
              </p>
            </div>
          </div>
          <p className={sty.cta}>{contact?.cta}</p>
        </div>
      </Container>
    </section>
  )
}
