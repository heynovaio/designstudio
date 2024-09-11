import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { Layout } from '../components/Layout'
import { components } from '../components/slices'
import { Testimonial } from '../components/_project/testimonial'
import { ProjectHero } from '../components/_project/project-hero'
import { ProjectDescription } from '../components/_project/project-description'

const ProjectTemplate = ({ data }) => {
  if (!data) return null

  const projectContent = data.prismicProject || {}
  const project = projectContent.data || {}
  const menu = data.prismicMenu || {}

  const { lang, type, url, tags } = projectContent || {}
  const alternateLanguages = projectContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <SliceZone slices={project.body} components={components} />
      <ProjectHero
        Tags={tags}
        Name={project.project_name}
        Type={project.project_type}
        Moment={project.favorite_moment}
      />
      <ProjectDescription
        description={project.project_description.richText}
        gallery={project.image_gallery}
      />

      <Testimonial
        Banner={project.banner_image_2}
        Title={project.client_title}
        Quote={project.client_quote}
        Name={project.client}
        Gallery={project.bottom_gallery}
      />
    </Layout>
  )
}

export const query = graphql`
  query projectQuery($id: String, $lang: String) {
    prismicProject(id: { eq: $id }, lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      id
      tags
      data {
        body {
          ... on PrismicSlice {
            id
            slice_type
            slice_label
          }
          ...ProjectDataBodyHeroBanner
          ...ProjectDataBodyColorPicker
        }
        banner_image {
          gatsbyImageData
          alt
        }
        project_name
        project_type
        favorite_moment
        image_gallery {
          image {
            gatsbyImageData
            alt
          }
        }
        project_description {
          richText
        }

        client_title
        client_quote
        client
        bottom_gallery {
          image {
            gatsbyImageData
            alt
          }
        }
      }
    }
    prismicMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(ProjectTemplate)
