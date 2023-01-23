import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText,PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"
import { IoClose } from "react-icons/io5"
import * as sty from './faculty-grid.module.scss';

export const FacultyGrid = ({ slice }) => {
  const [activeBio, setActiveBio] = React.useState(-1);

  const handleClick = (e) => {
    setActiveBio(e.target.value);
    console.log(e.target.value);
  }
  const handleClose = (e) => {
    setActiveBio(-1);
  }
  return (
    <section className={sty.FacultyGrid}>
      <Container>
        <div style={{marginBottom: 60}}>
          <h2>{slice.primary.title}</h2>
        </div>
        <div className={sty.grid}>
          {slice.items.map((item,index) => (
            <div className={sty.employeeCard}>
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={item.image?.gatsbyImageData}
                  alt={item.image?.alt || ""}
                  className={sty.image}
                />
              </div>
              <div className={sty.copyWrap}>
                <span className={sty.name}>{item.name}</span>
                <p className={sty.subName}>
                  Favourite Style: {item.favourite_style}
                </p>
                <p style={{marginBottom: 20}}>{item.mini_bio}</p>
                <Button>
                  <button onClick={handleClick} value={index}>Read More About {item.name}</button>
                </Button>
               
              </div>
            </div>
          ))}
        </div>
        {activeBio != -1 && ( 
          <div className={sty.bioModalWrap} >
            <div className={sty.bioModal}>
              <div className={sty.imageWrap}>
                <GatsbyImage
                  image={slice.items[activeBio]?.image?.gatsbyImageData}
                  alt={slice.items[activeBio]?.image?.alt || ""}
                  className={sty.image}
                />
              </div>
              <div className={sty.copyWrap}>
                <div className={sty.close} onClick={handleClose}>
                  <IoClose/>
                </div>
                <span className={sty.name}>{slice.items[activeBio]?.name}</span>
                <p className={sty.subName}>
                  Favourite Style: {slice.items[activeBio]?.favourite_style}
                </p>
                <PrismicRichText field={slice.items[activeBio]?.bio?.richText}/>
              
              </div>
            </div>
            <button className={sty.bioBack} onClick={handleClose}/>
          </div>
        )}
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyFacultyGrid on PrismicPageDataBodyFacultyGrid {
    id
    primary {
      title
    }
    items {
      image {
        gatsbyImageData
        alt
      }
      name 
      favourite_style
      mini_bio
      bio {
        richText
      }
    }
  }
`