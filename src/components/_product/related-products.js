import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { getShopifyImage } from 'gatsby-source-shopify'
import { Container, Button } from "../Components"
import * as sty from "./related-products.module.scss"
import product from '../../templates/product'

export const RelatedProducts = ({header, description, products=null}) => {
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
							href={`./${item.handle}`}
						>
							<div className={sty.imageWrap}>
								{/* <GatsbyImage 
								 	image={getShopifyImage({image: item.featuredImage, width: 368, height: 303, layout: "constrained"})}
									alt=""
									className={sty.image}
								/> */}
							</div>
							<div className={sty.infoWrap}>
								<p>{item.title}</p>
								<span className={sty.price}>${item.priceRangeV2.minVariantPrice.amount} {item.priceRangeV2.minVariantPrice.currencyCode}</span>
							</div>
						</PrismicLink>
					))}
				</div>

			</Container>
		</section>
	);
};

