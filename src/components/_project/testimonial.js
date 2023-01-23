import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'

import { Container, Button } from "../Components"


import * as sty from "./testimonial.module.scss"

export const Testimonial = ({Banner,Title,Quote,Name,Gallery}) => {
	
	return (
		<section className={sty.Testimonial}>
			<Container>
				<div className={sty.bannerWrap}>
					{Banner &&
						<GatsbyImage
							image={Banner.gatsbyImageData}
							alt={Banner.alt || ""}
						/>
					}
					
				</div>
				<div className={sty.copyWrap}>
					<h2>{Title}</h2>
					<p>{Quote}</p>
					<span className={sty.author}>{Name}</span>
				</div>
				<div className={sty.galleryWrap}>
					{Gallery.map((item,index) => (
						<div className={sty.imageWrap} key={`galleryItem: ${index}`}>
							<GatsbyImage
								image={item.image?.gatsbyImageData}
								alt={item.image?.alt || ""}
								className={sty.image}
							/>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};

