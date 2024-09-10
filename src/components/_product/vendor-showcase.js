import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
// import { getShopifyImage } from 'gatsby-source-shopify'
import { Container, Button } from "../Components"
import * as sty from "./vendor-showcase.module.scss"

export const VendorShowcase = ({header, description, products=null}) => {
	
	return (
		<section>
			<Container>
				<div className={sty.headerWrap}>
					<h2>{header}</h2>
					<p>{description}</p>
				</div>
				<div className={sty.productRow}>
					{products?.map((item,index) => (
						<PrismicLink
							className={sty.product}
							key={`product:${index}`}
							href={`./products/${item.handle}`}
						>
							<div className={sty.imageWrap}>
								{/* <GatsbyImage 
								 	image={getShopifyImage({image: item.featuredImage, width: 385, height: 316, layout: "constrained"})}
									alt=""
									className={sty.image}
								/> */}
							</div>
						</PrismicLink>
					))}
				</div>

			</Container>
		</section>
	);
};

