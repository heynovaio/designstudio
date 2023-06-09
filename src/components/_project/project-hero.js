import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"


import * as sty from "./project-hero.module.scss"

export const ProjectHero = ({Banner, Tags, Name, Type, Moment}) => {
 
	return (
		<section className={sty.ProjectHero}>
			<Container>
				<div className={sty.bannerWrap}>
					{Banner && 
						<GatsbyImage	
							image={Banner.gatsbyImageData}
							alt={Banner.alt || ""}
							className={sty.image}
						/>
					}
				</div>
				<div className={sty.Content}>
					<div className={sty.copyWrap}>
						<span className={sty.tag}>{Tags.map((tag => tag)
						)}</span>
						<h2>{Name}</h2>
						{Type && 
						<p><b>Project Type:</b> {Type}</p>
						}
						{Moment && 
						<p><b>Favorite Moment:</b> {Moment}</p>
						}
					</div>
				</div>
				
			</Container>
		</section>
	);
};

