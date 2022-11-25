import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import * as sty from "./BottomMenu.module.scss"

export const BottomMenu = ({menu}) => {
  return (
    <footer className={sty.footer}>
    </footer>
  )
}

export const query = graphql`
  fragment BottomMenuFragment on PrismicMenu {
    _previewable
    type
    lang
  }
`
