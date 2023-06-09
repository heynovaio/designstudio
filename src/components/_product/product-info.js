import * as React from 'react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { Container, Button } from "../Components"
import { AddToCart } from '../add-to-cart'
import { StoreContext } from '../../context/store-context'
import * as sty from "./product-info.module.scss"
import { formatPrice } from '../../utils/format-price'

export const ProductInfo = ({ product }) => {
	const {
		options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
		featuredImage,
    images,
		media
	} = product
	function getImage(img, w, h, lay){
		return getShopifyImage({image: img, layout: lay});
	}

	const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return currentOptions === variant.selectedOptions
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
 
	return (
		<section style={{background: "#FAEDE5"}}>
			<Container>
				<div className={sty.FlexWrap}>
					<div className={sty.productImages}>
						<div className={sty.featuredImg}>
							<GatsbyImage 
								image={getImage(featuredImage)} 
								alt=""
								className={sty.image}
								imgStyle={{objectFit: 'contain'}}
							/>
						</div>
						{media.slice(1,3).map((item,index) => (
							<div className={sty.subImg} key={`subImg:${index}`}>
								<GatsbyImage 
									image={getImage(item.image)}
									alt=""
									className={sty.image}
									imgStyle={{objectFit: 'contain'}}
								/>
							</div>
						))}
					</div>
					<div className={sty.productInfo}>
						<h3>{title}</h3>
						<span className={sty.price}>{price}</span>
						<div className={sty.purchase}>
							<p>Quantity</p>
							<input type='number' min='1' max="100" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
							<AddToCart
								variantId={productVariant.storefrontId}
								quantity={quantity}
								available={available}
								disabled={!quantity > 0}
							/>
						</div>
						<div className={sty.description}>
							<span className={sty.tabHeader}>Overview</span>
							
							<div dangerouslySetInnerHTML={{__html: product?.descriptionHtml}} className={sty.overview}/>
							{/* <Button variant="White">Save in Wishlist</Button> */}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

