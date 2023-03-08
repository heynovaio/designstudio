import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import Map, { Marker, Popup } from 'react-map-gl'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarker,
} from 'react-icons/fa'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapMaker from './../../images/marker.svg'
import * as sty from './contact.module.scss'

export const Contact = ({ marker, header, description, cta, email, phone }) => {
  const TOKEN =
    'pk.eyJ1IjoiYWh2ZG9kZCIsImEiOiJjbGFzcnIzbWsyNjR2M3FtaThia2UwbmY5In0.iW4eOap84EcSZuzCRTZYWA'
  return (
    <section className={sty.contact} id="contactUs">
      <Container className='flex'>
        <div className={sty.map}>
          <Map
            initialViewState={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              zoom: 14.5,
            }}
            mapStyle="mapbox://styles/ahvdodd/clasrv0ht000014pkszdj5t8j"
            mapboxAccessToken={TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <FaMapMarkerAlt style={{ fontSize: 80, color: '#CE6034' }} />
            </Marker>
            <Popup
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="top-left"
              closeButton={false}
              className={sty.infoBox}
            >
              Design Studio
            </Popup>
          </Map>
        </div>
        <div className={sty.copy}>
          <PrismicRichText field={header?.richText} />
          <p className={sty.description}>{description}</p>
          <div className={sty.contactList}>
            <div className={sty.info}>
              <p><FaEnvelope /> {email}</p>
            </div>
            <div className={sty.info}>
              <p><FaPhoneAlt /> {phone}</p>
            </div>
            <div className={sty.info}>
              <p>
                <FaMapMarkerAlt />
                Add address here amet ullamco dolor proident Exercitation
                velit ea{' '}
              </p>
            </div>
          </div>
          <p className={sty.cta}>{cta}</p>
        </div>
      </Container>
    </section>
  )
}