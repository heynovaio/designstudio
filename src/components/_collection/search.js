import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'

import { Container, Button } from "../Components"


import * as sty from "./search.module.scss"
function SearchBar({ defaultTerm, setFilters }) {
	const [term, setTerm] = React.useState(defaultTerm)
  
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSetFilters = React.useCallback(
	  debounce((value) => {
		setFilters((filters) => ({ ...filters, term: value }))
	  }, 200),
	  [setFilters]
	)
  
	return (
	  <form onSubmit={(e) => e.preventDefault()} className={sty.searchForm}>
		
		<input
		  type="text"
		  value={term}
		  onChange={(e) => {
			setTerm(e.target.value)
			debouncedSetFilters(e.target.value)
		  }}
		  placeholder="Search..."
		/>
		{term ? (
		  <button
			className={clearSearch}
			type="reset"
			onClick={() => {
			  setTerm("")
			  setFilters((filters) => ({ ...filters, term: "" }))
			}}
			aria-label="Clear search query"
		  >
			+
		  </button>
		) : undefined}
	  </form>
	)
}
export const Search = ({context}) => {
	
	return (
		<div className={sty.searchBar}>
			<div className={sty.search}>
				<label htmlFor="search">Search 
					
				</label>
				<input
						name="search"
						type="text"
					/>
			</div>
			<div className={sty.sort}>
				<label htmlFor="sort">Sort by
					
				</label>
				<select
						name="sort"
					>
						<option value="relevance" default>Relevance</option>
					</select>
			</div>
		</div>
	);
};

