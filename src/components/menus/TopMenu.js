import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Container } from './../Components'
import { BiShoppingBag, BiHeart, BiSearch, BiMenu, BiXCircle } from 'react-icons/bi'

import * as sty from './TopMenu.module.scss'
export const TopMenu = ({ menu, activeDocMeta }) => {
  const [mobileMenu, setMobileMenu] = React.useState(false)

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    document.body.classList.remove('modal-open');
    document.body.classList.toggle('modal-open', !mobileMenu);
  }

  return (
    <header className={sty.header}>
      <Container>
        <a className={sty.skip_button} href="#main">
          Skip to Content
        </a>
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
                <PrismicLink href={item.link?.url} key={`menuLink:${index}`}>
                  {item.label}
                </PrismicLink>
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
  )
}

const NavBarIcons = () => {
  return (
    <div className={sty.navBarIcons}>
      <PrismicLink className={sty.icon} href={'/'}>
        <BiHeart size={25} />
      </PrismicLink>
      <PrismicLink href={'/collection/in-stock'}>
        <BiSearch size={25} />
      </PrismicLink>
      <PrismicLink href={'/'}>
        <BiShoppingBag size={25} />
      </PrismicLink>
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
