import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { FaPlus, FaMinus } from "react-icons/fa"
import { Container, Button } from "../Components"


import * as sty from "./filter.module.scss"

export const Filter = ({context,data}) => {
	const handleClick = () => {
		setFilteredData(2);
		console.log(filteredData);
	}
	return (
		<div className={sty.Filter}>
			<h3 style={{marginBottom:20, fontWeight: "500"}}>Filter</h3>
			<button onClick={handleClick}>Test</button>
			<details className={sty.filterItem}>
				<summary className={sty.filterTitle}>Product Type </summary>
				{
					context.sort(function(a, b) {
						if(a.toLowerCase() < b.toLowerCase()) return -1;
						if(a.toLowerCase() > b.toLowerCase()) return 1;
						return 0;
					   }).map((item,index) => (
						<>
							<label htmlFor={item} className={sty.value}>
								{item}
								<input 
									type="checkbox" 
									value={item} 
									name={item}
									
								/>
							</label>
						</>
					))
				}
				
			</details>
			
		</div>
	);
};

