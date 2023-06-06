import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Container } from './../Components'
import { BiShoppingBag, BiHeart, BiSearch, BiMenu, BiXCircle } from 'react-icons/bi'
import { CartButton } from '../cart-button'
import { StoreContext } from '../../context/store-context'
import AniLink from "gatsby-plugin-transition-link/AniLink";

import * as sty from './TopMenu.module.scss'
export const TopMenu = ({ menu, activeDocMeta }) => {
  const { updateLocale,location,locationOptions } = React.useContext(StoreContext)
  const [mobileMenu, setMobileMenu] = React.useState(false)

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    if (typeof document !== `undefined`) {
      document.body.classList.remove('modal-open');
      document.body.classList.toggle('modal-open', !mobileMenu);
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
      <div className={sty.topBar}>
        <select onChange={handleChange} value={location.name}>
          {locationOptions?.map((local, i) => (
            <option value={local}>{local}</option>
          ))}
        </select>
      </div>
      <Container>
        <div className={sty.navBar}>
          <PrismicLink className={sty.LogoWrap} href="/">
            <GatsbyImage
              image={menu.logo?.gatsbyImageData}
              alt={menu.logo?.alt || ''}
              className={sty.logo}
            />
          </PrismicLink>
          <div className={`${sty.NavWrap} ${mobileMenu? sty.navOpen : sty.navClosed}`}>
            <div className={sty.MenuLinks}>
              {menu.menu_links.map((item, index) => (
              <AniLink paintDrip to={item.link?.url} hex="#DAE2DD" duration={1} key={`menuLink:${index}`}>
                {item.label}
              </AniLink>
              ))}
            </div>
            <div className={sty.SocialGroup}>
              <ul className={`list-no-style ${sty.SocialLinks}`}>
                {menu.socials.map((item, index) => (
                  <li>
                    <PrismicLink
                      href={'/'}
                      key={`socialLink:${index}`}
                      className={sty.SocialLink}
                    >
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
            <NavBarIcons />
            <button onClick={toggleMenu} className={`${sty.mobileBtn}  ${mobileMenu? sty.navOpen : sty.navClosed}`}>
              {mobileMenu? (<BiXCircle size={25} />) : (<BiMenu size={25} />)}
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
      {/* <PrismicLink className={sty.icon} href={'/'}>
        <BiHeart size={25} />
      </PrismicLink> */}
      <PrismicLink href={'/collection/in-stock'}>
        <BiSearch size={25} />
      </PrismicLink>
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
      menu_links {
        link {
          url
        }
        label
      }
    }
  }
`
