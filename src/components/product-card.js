import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { formatPrice } from "../utils/format-price"
import * as sty from "./product-card.module.scss"


export const ProductCard = ({Image, Title, Price, Width:number}) => {
	const price = formatPrice(
        Price.minVariantPrice?.currencyCode,
        Price.minVariantPrice?.amount
    );
	return (
		<div className={sty.ProductCard}>
            <div className={sty.imageWrap}>
                {Image &&
                    <GatsbyImage
                        image={Image}
                        alt={""}
                    />
                }
            </div>
            <p>{Title}</p>
            <p>{price}</p>
        </div>
	);
};