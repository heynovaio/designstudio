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
  const node = homepage.data;

  const heroTitle = node.hero_title;
  const heroDescription = node.hero_description;
  const catalogBtnLabel = node.catalog_btn_label;
  const worksBtnLabel = node.works_btn_label;
  const heroGallery = node.hero_gallery;
  const bellowHero = node.below_hero_richtext;

  const catalogDesc = node.catalog_richtext;
  const catalogImage = node.catalog_image;
  const catalogProducts = node.catalog_products;
  const catalogByRoomHeader = node.catalog_by_room_header;
  const catalogByRoomGallery = node.catalog_by_room_gallery;

  const instaHeader = node.instagram_header;
  const viewBtnLabel = node.view_media_btn_label;
  const media = node.all_media;

  const testimonials = node.testimonials;

  const contactMapMarker = node.contact_map_marker;
  const contactHeader = node.contact_header;
  const contactDesc = node.contact_description;
  const contactCTA = node.contact_cta;


  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
       <Hero
        title={heroTitle}
        description={heroDescription}
        catalogLabel={catalogBtnLabel}
        worksLabel={worksBtnLabel}
        gallery={heroGallery}
        bottom={bellowHero}
      />
      <Catalog
        description={catalogDesc} 
        image={catalogImage} 
        products={catalogProducts}
        gallery={catalogByRoomGallery}
        background={"rgba(206, 96, 52, 0.08)"}
      />
      <InstagramFeed
        header={instaHeader}
        viewBtnLabel={viewBtnLabel}
        media={media}
      />
      <Testimonials
        testimonials={testimonials}
        background={"rgba(249, 181, 142, 0.4)"}
      />
      <Contact
        marker={contactMapMarker}
        header={contactHeader}
        description={contactDesc}
        cta={contactCTA}
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
        hero_gallery {
          image {
            gatsbyImageData
            alt
          }   
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
        
        testimonials {
          testimonial_image {
            gatsbyImageData
            alt
          }
          
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
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(HomeTemplate)
