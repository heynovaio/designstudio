import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from './../Components'
import { BiMenu, BiXCircle } from 'react-icons/bi'
import { CartButton } from '../cart-button'
import { StoreContext } from '../../context/store-context'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import * as sty from './TopMenu.module.scss'
export const TopMenu = ({ menu, activeDocMeta }) => {
  const { updateLocale,  location,  locations } = React.useContext(StoreContext)
  const [mobileMenu, setMobileMenu] = React.useState(false)

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu)
    if (typeof document !== `undefined`) {
      document.body.classList.remove('modal-open')
      document.body.classList.toggle('modal-open', !mobileMenu)
    }
  }
  const handleChange = (e) => {
    updateLocale(e.target.value)
  }

  return (
    <>
      <header className={sty.header}>
        <a className={sty.skip_button} href="#main">
          Skip to Content
        </a>
        <Container>
          <div className={sty.navBar}>
            <div className={`${sty.NavWrap} ${mobileMenu ? sty.navOpen : ''}`}>
              <div className={sty.MenuLinks}>
                {menu.simple_menu.map((item, index) => (
                  <AniLink
                    paintDrip
                    to={item.link?.url}
                    hex="#DAE2DD"
                    duration={1}
                    key={`menuLink:${index}`}
                  >
                    {item.label}
                  </AniLink>
                ))}
              </div>
              <div className={sty.SocialGroup}>
                <ul className={`list-no-style ${sty.SocialLinks}`}>
                  {menu.socials.map((item, index) => (
                    <li key={`socialLink:${index}`}>
                      <PrismicLink href={'/'} className={sty.SocialLink}>
                        <GatsbyImage
                          image={item?.social_icon?.gatsbyImageData}
                          alt={item.social_icon?.alt || ''}
                        />
                      </PrismicLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={sty.iconNav}>
              {locations?.map((local, i) => (
                <button 
                  value={local.name} 
                  key={`locations:${i}`} 
                  onClick={handleChange} 
                  className={`${sty.locationBtn} ${local.name === location.name ? sty.activeBtn : ''}`}
                >
                  {local.abr}
                </button>
              ))}
              <NavBarIcons />
              <button
                onClick={toggleMenu}
                className={`${sty.mobileBtn}  ${mobileMenu ?? sty.navOpen}`}
              >
                {mobileMenu ? <BiXCircle size={25} /> : <BiMenu size={25} />}
              </button>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

const NavBarIcons = () => {
  const { checkout } = React.useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)
  return (
    <div className={sty.navBarIcons}>
      <CartButton quantity={quantity} />
    </div>
  )
}

export const query = graphql`
  fragment TopMenuFragment on PrismicMenu {
    _previewable
    type
    lang
    data {
      logo {
        gatsbyImageData
        alt
      }
      simple_menu {
        link {
          url
        }
        label
      }
    }
  }
`
