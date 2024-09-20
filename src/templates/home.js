import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'
import { Layout } from '../components/Layout'
import { InstagramFeed } from '../components/_homepage/instagram-feed'
import { Testimonials } from '../components/_homepage/testimonials'
import { components } from '../components/slices'
import { ShopByRoom } from '../components/collections-grid/shop-by-room'

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
  const catalogByRoomGallery = node.catalog_by_room_gallery
  const shopByRoomHeader = node.shop_by_room_header
  const shopByRoomSubHeader = node.shop_by_room_sub_header
  const shopByRoomBtnText = node.shop_by_room_btn_text
  const shopByRoomBtnLink = node.shop_by_room_btn_link

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

      <ShopByRoom
        gallery={catalogByRoomGallery}
        header={shopByRoomHeader}
        subheader={shopByRoomSubHeader}
        btnText={shopByRoomBtnText}
        btnLink={shopByRoomBtnLink}
      />
      <Testimonials
        testimonials={testimonials}
        background={'#A8C3BE'}
        ds_circle_logo={dsCircleLogo}
      />
      <InstagramFeed
        header={instaHeader}
        viewLabel={viewLabel}
        viewBtnLabel={viewBtnLabel}
        viewBtnLink={viewBtnLink}
        media={media}
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
          ...HomeDataBodyIntroDescription
          ...HomeDataBodyColorPicker
        }
        shop_by_room_header {
          richText
        }
        shop_by_room_btn_text {
          richText
        }
        shop_by_room_btn_link {
          url
        }
        shop_by_room_sub_header {
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
