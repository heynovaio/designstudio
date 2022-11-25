import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"

import * as sty from "./product-info.module.scss"

export const ProductInfo = ({ featuredImage, images, title, description, price}) => {
	function getImage(img, w, h, lay){
		return getShopifyImage({image: img, width: w, height: h, layout: lay});
	}
	const [quantity, setQuantity] = React.useState(0);
	
	return (
		<section style={{background: "#FAEDE5"}}>
			<Container>
				<div className={sty.FlexWrap}>
					<div className={sty.productImages}>
						<div className={sty.featuredImg}>
							<GatsbyImage 
								image={getImage(featuredImage,715,512,"constrained")} 
								alt=""
								className={sty.image}
							/>
						</div>
						{images.slice(1,3).map((item,index) => (
							<div className={sty.subImg} key={`subImg:${index}`}>
								<GatsbyImage 
									image={getImage(item.image,350,293,"constrained")}
									alt=""
									className={sty.image}
								/>
							</div>
						))}
					</div>
					<div className={sty.productInfo}>
						<h3>{title}</h3>
						<span className={sty.price}>${price.minVariantPrice.amount} {price.minVariantPrice.currencyCode}</span>
						<div className={sty.purchase}>
							<p>Quantity</p>
							<input type='number' min='1' max="100"/>
							<Button>Add to Cart</Button>
						</div>
						<div className={sty.description}>
							<span className={sty.tabHeader}>Overview</span>
							
							<div dangerouslySetInnerHTML={{__html: description}} className={sty.overview}/>
							<Button variant="White">Save in Wishlist</Button>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

