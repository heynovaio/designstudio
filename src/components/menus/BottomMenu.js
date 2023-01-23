import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import * as sty from "./BottomMenu.module.scss"

export const BottomMenu = ({menu}) => {
  return (
    <footer className={sty.footer}>
      <div className={sty.navBar}>   
        <div className={sty.MenuLinks}>
          {menu.menu_links.map((item,index) => (
            <PrismicLink href={item.link?.url} key={`menuLink:${index}`}>
              {item.label}
            </PrismicLink>
          ))}
        </div>
        <PrismicLink
          className={sty.LogoWrap}
          href={"/"}
        >
          <GatsbyImage
            image={menu.logo_alt?.gatsbyImageData}
            alt={menu.logo_alt?.alt || ""}
          />
        </PrismicLink>
      </div>
      <div>
        <p style={{color: "white"}}>{menu.copyright}</p>
      </div>
    </footer>
  )
}

export const query = graphql`
  fragment BottomMenuFragment on PrismicMenu {
    _previewable
    type
    lang
    data {
      logo_alt {
        gatsbyImageData
        alt
      }
      menu_links {
        link {
          url
        }
        label
      }
      copyright
    }
  }
`
