import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"
import { getShopifyImage } from "gatsby-source-shopify"

import * as sty from "./collections-grid.module.scss"

export const ShopByRoom = ({ }) => {
	const collectionData = useStaticQuery(graphql`
		query {
			allShopifyCollection(filter: {handle: {in: ["bath","office","bedroom","dining","outdoor"]}}) {
				nodes {
					handle
					image {
						src
					}
				}
			}
		}
	`);
	const collections = collectionData.allShopifyCollection.nodes;

	function getImage(shopImg){
		const imageData = getShopifyImage({
			shopImg,
			width: 800,
			height: 800,
			layout: "fixed",
		});
		return imageData;
	}
	return (
		<div className={sty.ShopByRoom}>
			<h2>Shop by Room</h2>
			<div className={sty.collectionsGrid}>
				{collections.map((item,index) => (
					<PrismicLink 
						className={sty.gridItem} 
						key={`collection:${index}`}
						href={`./collection/${item.handle}`}
					>
						<div className={sty.imgBox}>
							<img src={item.image?.src}/>
						</div>
						<h3>{item.handle}</h3>
					</PrismicLink>
				))}
			</div>
		</div>
	);
};

