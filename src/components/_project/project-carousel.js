import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import * as sty from "./project-carousel.module.scss"

export const ProjectCarousel = ({Gallery,Description}) => {
	const responsive = {
		mobile: {
			breakpoint: { max: 10000, min: 1200 },
			items: 2,
		},
		desktop: {
			breakpoint: { max: 1200, min: 0 },
			items: 1,
		},
	};
	const ButtonGroup = ({ next, previous }) => {
		return (
		<button className={sty.carouselNext} onClick={() => { 
				next(); 
			}}>
			<IoIosArrowForward />
		</button>
		);
	};
	return (
		<>
			<section>
				<Container>
					{Gallery.length > 0 &&
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
								{Gallery.map((item,index) => (
									<div className={sty.galleryItem} key={`gallery:${index}`}>
										<GatsbyImage
											image={item.image?.gatsbyImageData}
											alt={item.image?.alt || ""}
											className={sty.image}
										/>
									</div>
								))}
							</MultiCarousel>
						</div>
					}
					<div className={sty.Content}>
						<div className={sty.copyWrap}>
							<PrismicRichText field={Description.richText}/>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
};

