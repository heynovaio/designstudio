/**
 * This file contains configuration for `gatsby-plugin-prismic-previews` to
 * support preview sessions from Prismic with drafts and unpublished documents.
 *
 * @see https://prismic.io/docs/technologies/previews-gatsby
 */

import { componentResolverFromMap } from 'gatsby-plugin-prismic-previews'

import { prismicRepo } from '../../prismic-configuration'
import { linkResolver } from './linkResolver'

import HomeTemplate from './../templates/home'
import PageTemplate from './../templates/page'
import ProjectTemplate from './../templates/project'
import CatalogTemplate from './../templates/catalog'

/**
 * Prismic preview configuration for each repository in your app. This set of
 * configuration objects will be used with the `PrismicPreviewProvider`
 * higher order component.
 *
 * If your app needs to support multiple Prismic repositories, add each of
 * their own configuration objects here as additional elements.
 *
 */
export const repositoryConfigs = [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
    componentResolver: componentResolverFromMap({
      home: HomeTemplate,
      page: PageTemplate,
      project: ProjectTemplate,
      catalog: CatalogTemplate,
    }),
  },
]
