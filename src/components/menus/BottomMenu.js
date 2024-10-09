import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from './../Components'

import * as sty from './BottomMenu.module.scss'

export const BottomMenu = ({ menu }) => {
  return (
    <footer className={sty.footer} id="footer">
      <Container className={`flex ${sty.containerFooter} `}>
        <div className={sty.contactColumn}>
          <div className={sty.contacts}>
            <div className={sty.info}>
              <div className={sty.MenuLinkTitle}>Cayman Islands</div>
              <p>
                <a href={`tel:${menu.caymans_phone}`}>{menu.caymans_phone}</a>
              </p>
              <p>{menu.caymans_street}</p>
              <p>{menu.caymans_city}</p>
              <p>{menu.caymans_location}</p>
            </div>

            <div className={sty.info}>
              <div className={sty.MenuLinkTitle}>Turks & Caicos</div>
              <p>
                <a href={`tel:${menu.turks_and_caicos_phone}`}>
                  {menu.turks_and_caicos_phone}
                </a>
              </p>
              <p>{menu.turks_and_caicos_complex}</p>
              <p>{menu.turks_and_caicos_street}</p>
              <p>{menu.turks_and_caicos_city}</p>
              <p>{menu.turks_and_caicos_location}</p>
              <p>
                <a href={`mailto:${menu.turks_and_caicos_email}`}>
                  {menu.turks_and_caicos_email}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={sty.logoColumn}>
          <PrismicLink href={'/'}>
            <GatsbyImage
              image={menu.logo_alt?.gatsbyImageData}
              alt={menu.logo_alt?.alt || ''}
            />
          </PrismicLink>
          {/* <div className={sty.subscribe}>
            <p>
              <span className={sty.friendsText}>Let's be friends </span>
              <span className={sty.inboxText}>Interiors in your Inbox</span>
            </p>
           ** FORM FIELD WILL BE HERE **
          </div> */}
        </div>
        <div className={sty.linksColumn}>
          <div className={sty.MenuLinks}>
            <ul className="list-no-style">
              {menu.menu_links.map((item) => (
                <li key={`menuLink:${item.link?.url}`}>
                  <PrismicLink href={item.link?.url}>{item.label}</PrismicLink>
                </li>
              ))}
              <li>
                {/* <div className={sty.legalTitle}>
                  {menu.legal_links_title.text}
                </div>
              </li>
              <li>
                <ul className="list-no-style">
                  {menu.legal_links.map((item, index) => (
                    <li>
                      <PrismicLink
                        href={item.link?.url}
                        key={`legalLink:${index}`}
                      >
                        {item.label}
                      </PrismicLink>
                    </li>
                  ))}
                </ul> */}
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className={sty.bottomBar}>
        <Container className={sty.bottomContainer}>
          <div className={sty.bottomBarInfoWrap}>
            <p>{menu.copyright}</p>
          </div>
          <div className={sty.bottomBarInfoWrap}>
            <p>
              <span className={sty.helloText}>Say Hello </span>
              <span className={sty.emailText}>
                <a href={`mailto:${menu.caymans_email}`}>
                  {menu.caymans_email}
                </a>
              </span>
            </p>
          </div>
          <div className={sty.bottomBarInfoWrap}>
            <div className={sty.SocialColumn}>
              <div className={sty.SocialGroup}>
                <ul className={`list-no-style ${sty.SocialLinks}`}>
                  {menu.socials.map((item, index) => (
                    <li key={`socialLink:${item.social_link?.url}`}>
                      <PrismicLink
                        href={item.social_link?.url}
                        title={`Link to ${item.social_link?.url}`}
                      >
                        <GatsbyImage
                          image={item?.social_icon?.gatsbyImageData}
                          alt={item.social_icon?.alt || ''}
                        />
                      </PrismicLink>
                    </li>
                  ))}
                  <li>
                    <p>DesignStudioInteriors</p>
                  </li>
                </ul>
              </div>
            </div>
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
      caymans_phone
      caymans_street
      caymans_city
      caymans_location
      caymans_email
      turks_and_caicos_email
      turks_and_caicos_complex
      turks_and_caicos_street
      turks_and_caicos_city
      turks_and_caicos_location
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
