import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { TopMenu } from './menus/TopMenu'
import { BottomMenu } from './menus/BottomMenu'

import * as sty from './Layout.scss'

export const Layout = ({ children, menu, activeDocMeta }) => {
  document.body.classList.remove('modal-open');

  const queryData = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{queryData.site.siteMetadata.title}</title>
        <meta
          name="description"
          content={queryData.site.siteMetadata.description}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <TopMenu menu={menu} activeDocMeta={activeDocMeta} />
      <main className="main" id="main">{children}</main>
      <BottomMenu menu={menu}/>
    </>
  )
}
