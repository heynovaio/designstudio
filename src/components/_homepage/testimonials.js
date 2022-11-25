import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { FaChevronRight } from 'react-icons/fa'
import { Container, Button } from "../Components"
import * as sty from "./testimonials.module.scss"

export const Testimonials = ({ testimonials,background }) => {
	const [slide, setSlide] = React.useState(0);
	const slideLength = testimonials.length;
	const curTest = testimonials[slide];

	const handleClick = () => {
		if(slide+1 >= slideLength){
			setSlide(0);
		}
		else{
			setSlide(slide+1);
		};
	}
	return (
		<section style={{background: background}}>
			<Container>
				<div className={sty.flexWrap}>
					<div className={sty.quotes}>
						{testimonials.map((item,index) => (
							<div 
								className={index===slide ? sty.quoteWrapActive : sty.quoteWrap} 
								key={`testimonial:${index}`}
							>
								<PrismicRichText field={item.testimonial_richtext?.richText}/>
								<span className={sty.author}>{item.testimonial_author}</span>
							</div>
						))}
					</div>
					<div className={sty.quoteNav}>
						<div className={sty.imageWrap}>
							<GatsbyImage
								image={curTest.testimonial_image?.gatsbyImageData}
								alt={curTest.testimonial_image?.alt || ""}
								className={sty.image}
							/>
						</div>
						<div className={sty.controlWrap}>
							<div className={sty.quoteControls}>
								<p>{slide + 1} of {slideLength}</p>
								<div className={sty.dotList}>
									{testimonials.map((item,index) => (
										<div 
											className={index === slide ? sty.activeDot : sty.dot}
											onClick={() => {setSlide(index)}} 
											key={`dot:${index}`}
										/>
									))}
								</div>
							</div>
							<div className={sty.nextBtn} onClick={handleClick}>
								<FaChevronRight/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

