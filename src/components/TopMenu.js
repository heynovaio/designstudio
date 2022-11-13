import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage } from 'gatsby-plugin-image'
import { Container } from './Container'
import { LanguageSwitcher } from './LanguageSwitcher'
import * as s from './TopMenu.module.scss'
export const TopMenu = ({ menu, activeDocMeta }) => {
  return (
    <header className={s.header}>
      <a className={s.skip_button} href="#main">   
        Skip to Content
      </a>
      <LanguageSwitcher activeDocMeta={activeDocMeta} />
    </header>
  )
}

export const query = graphql`
  fragment TopMenuFragment on PrismicMenu {
    _previewable
    type
    lang
  }
`
