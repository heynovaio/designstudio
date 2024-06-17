import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'

import { Hero } from '../components/_homepage/hero'
import { Catalog } from '../components/_homepage/catalog'
import { InstagramFeed } from '../components/_homepage/instagram-feed'
import { Testimonials } from '../components/_homepage/testimonials'
import { Contact } from '../components/_homepage/contact'

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

  const testimonials = node.testimonials

  const contactMapMarker = node.contact_map_marker
  const contactHeader = node.contact_header
  const contactDesc = node.contact_description
  const contactCTA = node.contact_cta
  const contactEmail = menuNode.caymans_email
  const contactPhone = menuNode.caymans_phone

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <Hero
        title={heroTitle}
        description={heroDescription}
        catalogLabel={catalogBtnLabel}
        catalogLink={btn1}
        worksLabel={worksBtnLabel}
        worksLink={btn2}
        gallery={heroGallery}
        bottom={bellowHero}
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
        background={'rgba(249, 181, 142, 0.4)'}
      />
      <Contact
        marker={contactMapMarker}
        header={contactHeader}
        description={contactDesc}
        cta={contactCTA}
        email={contactEmail}
        phone={contactPhone}
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
        testimonials {
          testimonial_richtext {
            richText
          }
          testimonial_author
        }
        contact_map_marker {
          latitude
          longitude
        }
        contact_header {
          richText
        }
        contact_description
        contact_cta
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
