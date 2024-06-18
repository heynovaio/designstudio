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
        <div className={sty.leftCol}>
          <div className={sty.ContactColumn}>
            <div className={sty.MenuLinkTitle}> Cayman Islands</div>
            <div className={sty.info}>
              <p>{menu.caymans_phone}</p>
              <p>{menu.caymans_street}</p>
              <p>{menu.caymans_city}</p>
              <p>{menu.caymans_location}</p>
            </div>
            <div className={sty.MenuLinkTitle}> Turks & Caicos</div>
            <div className={sty.info}>
              <p>{menu.turks_and_caicos_phone}</p>
              <p>{menu.turks_and_caicos_complex}</p>
              <p>{menu.turks_and_caicos_street}</p>
              <p>{menu.turks_and_caicos_city}</p>
              <p>{menu.turks_and_caicos_location}</p>
              <p>{menu.turks_and_caicos_email}</p>
            </div>
          </div>
        </div>
        <div className={sty.middleCol}>
          <PrismicLink href={'/'}>
            <GatsbyImage
              image={menu.logo_alt?.gatsbyImageData}
              alt={menu.logo_alt?.alt || ''}
            />
          </PrismicLink>
          <div className={sty.subscribe}>
            <p>
              <span className={sty.friendsText}>Let's be friends </span>
              <span className={sty.inboxText}>Interiors in your Inbox</span>
            </p>
            {/**FORM FIELD */}
          </div>
        </div>
        <div className={sty.rightCol}>
          <div className={sty.MenuLinks}>
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
      </Container>
      <div className={sty.bottomBar}>
        <Container className={sty.bottomContainer}>
          <div>
            <p>{menu.copyright}</p>
          </div>
          <div>
            <p>
              <span className={sty.helloText}>Say Hello </span>
              <span className={sty.emailText}>{menu.caymans_email}</span>
            </p>
          </div>
          <div className={sty.SocialColumn}>
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
                <p>DesignStudioInteriors</p>
              </ul>
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
