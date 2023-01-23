import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"


import * as sty from "./center-text.module.scss"

export const CenterText = ({Title, Description, Btn}) => {
 
	return (
		<section className={sty.CenterText}>
			<Container>
				<div className={sty.centerWrap}>
					<h1>{Title}</h1>
					<p>{Description}</p>
					<PrismicLink href={"/"}>
						<Button>{Btn}</Button>
					</PrismicLink>
				</div>
			</Container>
		</section>	
	);
};

