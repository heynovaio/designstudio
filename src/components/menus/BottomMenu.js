import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Container } from './../Components'

import * as sty from './BottomMenu.module.scss'

export const BottomMenu = ({ menu }) => {
  return (
    <footer className={sty.footer}>
      <Container className={`flex ${sty.containerFooter} `}>
        <div className={sty.SocialColumn}>
          <div className={sty.SocialGroup}>
            <div className={sty.MenuLinkTitle}>Follow Us</div>
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
          <PrismicLink className={sty.LogoWrap} href={'/'}>
            <GatsbyImage
              image={menu.logo_alt?.gatsbyImageData}
              alt={menu.logo_alt?.alt || ''}
              className={sty.logo}
            />
          </PrismicLink>
        </div>
        <div className={sty.navBar}>
          <div className={sty.MenuLinks}>
            <div className={sty.MenuLinkTitle}>
              {menu.menu_links_title.text}
            </div>
            <ul className="list-no-style">
              {menu.menu_links.map((item, index) => (
                <li>
                  <PrismicLink href={item.link?.url} key={`menuLink:${index}`}>
                    {item.label}
                  </PrismicLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={sty.MenuLinks}>
            <div className={sty.MenuLinkTitle}>
              {menu.catalog_links_title.text}
            </div>
            <ul className="list-no-style">
              {menu.catalog_links.map((item, index) => (
                <li>
                  <PrismicLink
                    href={
                      item.link
                        ? item.link.url
                        : `/collection/${item.catalog_handle}`
                    }
                    key={`categoryLink:${index}`}
                  >
                    {item.label}
                  </PrismicLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={sty.MenuLinks}>
            <div className={sty.MenuLinkTitle}>
              {menu.legal_links_title.text}
            </div>
            <ul className="list-no-style">
              {menu.legal_links.map((item, index) => (
                <li>
                  <PrismicLink href={item.link?.url} key={`legalLink:${index}`}>
                    {item.label}
                  </PrismicLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={sty.ContactColumn}>
          <div className={sty.MenuLinkTitle}> Caymans Contact</div>
          <div className={sty.info}>
            <p>{menu.caymans_email}</p>
          </div>
          <div className={sty.info}>
            <p>{menu.caymans_phone}</p>
          </div>
          {/* <div className={sty.info}>
              <p className={sty.address}>
                {menu.caymans_address}
              </p>
            </div> */}

          <div className={sty.MenuLinkTitle}> Turks & Caicos Contact</div>
          <div className={sty.info}>
            <p>{menu.turks_and_caicos_email}</p>
          </div>
          <div className={sty.info}>
            <p>{menu.turks_and_caicos_phone}</p>
          </div>
          {/* <div className={sty.info}>
              <p>
                {menu.turks_and_caicos_address}
              </p>
            </div> */}
        </div>
      </Container>
      <div className={sty.Copyright}>
        <Container className={sty.bottomBar}>
          <div>
            <p>{menu.copyright} 2024 Copyright</p>
          </div>
          <div>
            <p>say hello message</p>
          </div>
          <div>
            <p>socials</p>
          </div>
        </Container>
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
      catalog_links {
        link {
          url
        }
        label
        catalog_handle
      }
      legal_links {
        link {
          url
        }
        label
      }
      legal_links_title {
        text
      }
      catalog_links_title {
        text
      }
      menu_links_title {
        text
      }
      caymans_email
      caymans_phone
      turks_and_caicos_email
      turks_and_caicos_phone
      socials {
        social_icon {
          gatsbyImageData
          alt
        }
        social_link {
          url
        }
      }
      copyright
    }
  }
`
