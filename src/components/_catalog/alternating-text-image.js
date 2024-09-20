import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { Container, Button } from '../Components'
import { FaArrowRight } from 'react-icons/fa'

import * as sty from './alternating-text-image.module.scss'

export const AlternatingTextImage = ({ Sections }) => {
	return (
		<section className={sty.AlternatingTextImage}>
			<Container>
				{Sections.map((item, index) => (
					<div
						className={index % 2 === 0 ? sty.FlexWrap : sty.FlexWrapAlt}
						key={`text-image:${index}`}
					>
						<div className={sty.copyWrap}>
							<h2>{item.collection_title}</h2>
							<PrismicRichText field={item.collection_copy?.richText} />
							<PrismicLink href={`/collection/${item.collection_handle}`}>
								Browse <FaArrowRight />
							</PrismicLink>
						</div>
						<div className={sty.imageWrap}>
							<GatsbyImage
								image={item.collection_image?.gatsbyImageData}
								alt={item.collection_image?.alt || ''}
								className={sty.image}
							/>
						</div>
					</div>
				))}
			</Container>
		</section>
	)
}
