import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { Layout } from '../components/Layout'
import { Catalog } from '../components/_homepage/catalog'
import { InstagramFeed } from '../components/_homepage/instagram-feed'
import { Testimonials } from '../components/_homepage/testimonials'
import { components } from '../components/slices'

const HomeTemplate = ({ data }) => {
  if (!data) return null

  const homepage = data.prismicHome || {}
  const menu = data.prismicMenu || {}

  const { lang, type, url } = homepage || {}
  const alternateLanguages = homepage.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const node = homepage.data
  const menuNode = menu.data

  const heroTitle = node.hero_title
  const heroDescription = node.hero_description
  const catalogBtnLabel = node.catalog_btn_label
  const worksBtnLabel = node.works_btn_label
  const btn1 = node.btn_1
  const btn2 = node.btn_2
  const heroGallery = node.hero_gallery
  const bellowHero = node.below_hero_richtext

  const catalogDesc = node.catalog_richtext
  const catalogImage = node.catalog_image
  const catalogProducts = node.catalog_products
  const catalogByRoomHeader = node.catalog_by_room_header
  const catalogByRoomGallery = node.catalog_by_room_gallery

  const instaHeader = node.instagram_header
  const viewLabel = node.view_media_label
  const viewBtnLabel = node.view_media_btn_label
  const viewBtnLink = node.view_media_btn_link
  const media = node.all_media

  const dsCircleLogo = node.ds_circle_logo

  const testimonials = node.testimonials

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <SliceZone
        slices={node.body}
        components={components}
        context={{ lang: lang }}
      />
      <Catalog
        description={catalogDesc}
        image={catalogImage}
        products={catalogProducts}
        gallery={catalogByRoomGallery}
        background={'rgba(206, 96, 52, 0.08)'}
      />
      <InstagramFeed
        header={instaHeader}
        viewLabel={viewLabel}
        viewBtnLabel={viewBtnLabel}
        viewBtnLink={viewBtnLink}
        media={media}
      />
      <Testimonials
        testimonials={testimonials}
        background={'#A8C3BE'}
        ds_circle_logo={dsCircleLogo}
      />
    </Layout>
  )
}

export const query = graphql`
  query homeQuery($lang: String) {
    prismicHome(lang: { eq: $lang }) {
      _previewable
      alternate_languages {
        uid
        type
        lang
      }
      lang
      url
      type
      data {
        body {
          ... on PrismicSlice {
            id
            slice_type
            slice_label
          }
          ...HomeDataBodyHeroBanner
        }
        hero_title {
          richText
        }
        hero_description
        catalog_btn_label
        works_btn_label
        btn_1 {
          url
        }
        btn_2 {
          url
        }
        hero_gallery {
          image {
            gatsbyImageData
            alt
          }
          image_2 {
            gatsbyImageData
            alt
          }
          image_3 {
            gatsbyImageData
            alt
          }
          project_name
        }
        below_hero_richtext {
          richText
        }
        catalog_richtext {
          richText
        }
        catalog_image {
          gatsbyImageData
        }

        catalog_products {
          item_x_value
          item_y_value
        }
        catalog_by_room_header {
          richText
        }
        catalog_by_room_gallery {
          image {
            gatsbyImageData
            alt
          }

          room_label
          room_link_label
        }
        instagram_header {
          richText
        }
        view_media_label
        all_media {
          media_image {
            gatsbyImageData
            alt
          }
        }
        view_media_btn_label
        view_media_btn_link {
          url
        }
        ds_circle_logo {
          gatsbyImageData
          alt
        }
        testimonials {
          testimonial_richtext {
            richText
          }
          testimonial_author
        }
      }
    }
    prismicMenu(lang: { eq: $lang }) {
      _previewable
      data {
        caymans_email
        caymans_phone
      }
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(HomeTemplate)
