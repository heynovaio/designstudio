import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Container } from './../Components'
import { BiShoppingBag, BiHeart, BiSearch } from 'react-icons/bi'

import * as sty from './TopMenu.module.scss'
export const TopMenu = ({ menu, activeDocMeta }) => {
  return (
    <header className={sty.header}>
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
        <div className={sty.NavWrap}>
          <div className={sty.MenuLinks}>
            {menu.menu_links.map((item, index) => (
              <PrismicLink href={item.link?.url} key={`menuLink:${index}`}>
                {item.label}
              </PrismicLink>
            ))}
          </div>
          <NavBarIcons />
        </div>
      </div>
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
