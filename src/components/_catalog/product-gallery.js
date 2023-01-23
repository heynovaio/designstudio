import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Button } from "../Components"
import { ProductCard } from '../product-card';

import * as sty from "./product-gallery.module.scss"

export const ProductGallery = ({Title, Gallery, Products}) => {
	const responsive = {
		mobile: {
			breakpoint: { max: 10000, min: 0 },
			items: 3,
		},
	};
	console.log(Products.length)
	const ButtonGroup = ({ next, previous }) => {
		return (
			<div className="carousel-button-group">
				<button className="next" onClick={() => { 
						next(); 
					}}>
					<IoIosArrowForward />
				</button>
			</div>
		);
	};
	function productsList(){
		var prods = [];
		Gallery.map(
			item => prods.push(Products.find(prod => prod.handle == item.product_handle))
		);
		return prods;
	};
	
	return (
		<section className={sty.ProductGallery}>
			<Container>
				<div className={sty.headerWrap}>
					<h2>{Title}</h2>
				</div>
				<div className={sty.carouselWrap}>
					<MultiCarousel
						ssr={true}
						infinite={true}
						arrows={false}
						swipeable={true}
						responsive={responsive}
						showDots={false}
						renderButtonGroupOutside={true}
						customButtonGroup={<ButtonGroup />}
						
					>
						{productsList().map((item, index) => (
							<ProductCard
							 	Image={getShopifyImage({image: item.featuredImage, width: 322, height: 265, layout: "constrained"})}
							 	Title={item.title}
							 	Price={item.priceRangeV2}
							 	Width={256}
							 />
						))}
						<></>
					</MultiCarousel>
				</div>
			</Container>
		</section>	
	);
};

