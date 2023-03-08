import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Container } from './../Components'

import * as sty from './BottomMenu.module.scss'

export const BottomMenu = ({ menu }) => {
  return (
    <footer className={sty.footer}>
      <Container className='flex'>
        <div className={sty.SocialColumn}>
            <div className={sty.SocialGroup}>
              <div className={sty.MenuLinkTitle}>Follow Us</div>
              <ul className={sty.SocialLinks}>
                {menu.socials.map((item, index) => (
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
            <div className={sty.MenuLinkTitle}>{menu.menu_links_title.text}</div>
            {menu.menu_links.map((item, index) => (
              <PrismicLink href={item.link?.url} key={`menuLink:${index}`}>
                <p>{item.label}</p>
              </PrismicLink>
            ))}
          </div>
          <div className={sty.MenuLinks}>
            <div className={sty.MenuLinkTitle}>
              {menu.catalog_links_title.text}
            </div>
            {menu.catalog_links.map((item, index) => (
              <PrismicLink
                href={
                  item.link ? item.link.url : `/collection/${item.catalog_handle}`
                }
                key={`categoryLink:${index}`}
              >
                <p>{item.label}</p>
              </PrismicLink>
            ))}
          </div>
          <div className={sty.MenuLinks}>
            <div className={sty.MenuLinkTitle}>{menu.legal_links_title.text}</div>
            {menu.legal_links.map((item, index) => (
              <PrismicLink href={item.link?.url} key={`legalLink:${index}`}>
                <p> {item.label}</p>
              </PrismicLink>
            ))}
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
            <div className={sty.info}>
              <p>
                Add address here amet ullamco dolor proident Exercitation velit ea{' '}
              </p>
            </div>

            <div className={sty.MenuLinkTitle}> Turks & Caicos Contact</div>
            <div className={sty.info}>
              <p>{menu.turks_and_caicos_email}</p>
            </div>
            <div className={sty.info}>
              <p>{menu.turks_and_caicos_phone}</p>
            </div>
            <div className={sty.info}>
              <p>
                Add address here amet ullamco dolor proident Exercitation velit ea{' '}
              </p>
            </div>
          </div>
      </Container>
      <div className={sty.Copyright}>
        <Container>
          <p>{menu.copyright}</p>
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
