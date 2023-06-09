import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import Map, { Marker, Popup } from 'react-map-gl'

import mapboxgl from 'mapbox-gl';
// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
  
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarker,
} from 'react-icons/fa'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapMaker from './../../images/marker.svg'
import * as sty from './contact.module.scss'
import { StoreContext } from '../../context/store-context'


export const Contact = ({ marker, header, description, cta, email, phone }) => {
  const TOKEN =
    'pk.eyJ1IjoiYWh2ZG9kZCIsImEiOiJjbGFzcnIzbWsyNjR2M3FtaThia2UwbmY5In0.iW4eOap84EcSZuzCRTZYWA'

  const { location } = React.useContext(StoreContext)
  const { map: mapCoords, contact } = location || {}
  const [viewState, setViewState] = React.useState({
    latitude: marker?.latitude,
    longitude: marker?.longitude,
    zoom: 14.5,
  });
  React.useEffect(() => (
    setViewState({
        latitude:  mapCoords?.latitude,
        longitude:  mapCoords?.longitude,
        zoom: 14.5,
      })
  ),[location])
  return (
    <section className={sty.contact} id="contactUs">
      <Container className='flex'>
        <div className={sty.map}>
          <Map
            {...viewState}
            onMove={e => setViewState(e.viewState)}
            mapStyle="mapbox://styles/ahvdodd/clasrv0ht000014pkszdj5t8j"
            mapboxAccessToken={TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            <Marker
              longitude={ mapCoords?.longitude}
              latitude={ mapCoords?.latitude}
              anchor="bottom"
            >
              <FaMapMarkerAlt style={{ fontSize: 80, color: '#CE6034' }} />
            </Marker>
            <Popup
              longitude={ mapCoords?.longitude}
              latitude={ mapCoords?.latitude}
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
              <p><FaEnvelope /> {contact?.email}</p>
            </div>
            <div className={sty.info}>
              <p><FaPhoneAlt /> {contact?.phone}</p>
            </div>
            <div className={sty.info}>
              <p>
                <FaMapMarkerAlt />
                48 Market St, Camana Bay, Grand Cayman, Cayman Islands
              </p>
            </div>
          </div>
          <p className={sty.cta}>{contact?.cta}</p>
        </div>
      </Container>
    </section>
  )
}