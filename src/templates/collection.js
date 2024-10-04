import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText, PrismicText, PrismicLink } from '@prismicio/react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { StoreContext } from '../context/store-context'
import { Layout } from '../components/Layout'
import { Container, Button } from '../components/Components'

import { getPrice } from '../utils/get-price'

import * as sty from './collection.module.scss'

const DEFAULT_PRODUCTS_PER_PAGE = 100

const CollectionTemplate = ({ data }) => {
  if (!data) return null

  const menu = data.prismicMenu || {}
  const Collection = data.shopifyCollection
  const activeDoc = {
    lang: 'en-ca',
    type: 'Collection',
    url: `/collection/${Collection.handle}/`,
    alternateLanguages: null,
  }

  const { location } = React.useContext(StoreContext)

  const typesList = []
  const tagsList = []
  const collectionsList = []

  if (Collection.products) {
    Collection.products.forEach((prod) => {
      if (prod.productType && !typesList.includes(prod.productType)) {
        typesList.push(prod.productType)
      }
      if (prod.tags) {
        prod.tags.forEach((tag) => {
          if (tag && !tagsList.includes(tag)) {
            tagsList.push(tag)
          }
        })
      }
    })
  }

  if (Collection.metafields) {
    Collection.metafields.forEach((metafield) => {
      if (metafield.key === 'collection_type' && metafield.value === 'Styles') {
        collectionsList.push(Collection.title)
      }
    })
  }

  typesList.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  tagsList.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  collectionsList.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

  const [searchTerm, setSearchTerm] = useState('')
  const [allData, setAllData] = useState(Collection.products || [])
  const [filteredData, setFilteredData] = useState(allData)
  const [searchedData, setSearchedData] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [curSort, setCurSort] = useState('relevance')

  const handleFilter = (e) => {
    const { name, checked } = e.target
    if (typesList.includes(name)) {
      setSelectedTypes((prev) =>
        checked ? [...prev, name] : prev.filter((type) => type !== name),
      )
    } else if (tagsList.includes(name)) {
      setSelectedTags((prev) =>
        checked ? [...prev, name] : prev.filter((tag) => tag !== name),
      )
    } else if (collectionsList.includes(name)) {
      setSelectedCollections((prev) =>
        checked
          ? [...prev, name]
          : prev.filter((collection) => collection !== name),
      )
    }
  }

  useEffect(() => {
    const filtered = Collection.products.filter((prod) => {
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(prod.productType)
      const matchesTag =
        selectedTags.length === 0 ||
        prod.tags.some((tag) => selectedTags.includes(tag))
      const matchesCollection =
        selectedCollections.length === 0 ||
        selectedCollections.includes(Collection.title)
      return matchesType && matchesTag && matchesCollection
    })
    setFilteredData(filtered.length === 0 ? allData : filtered)
  }, [selectedTypes, selectedTags, selectedCollections, Collection.products])

  const handleSort = (e) => {
    setCurSort(e.target.value)
  }

  const sortData = (data) => {
    switch (curSort) {
      case 'relevance':
        return data
      case 'name':
        return data.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
        )
      default:
        return data
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  useEffect(() => {
    const hits = filteredData.filter((prod) =>
      prod.title.toLowerCase().includes(searchTerm),
    )
    setSearchedData(sortData(hits))
  }, [filteredData, searchTerm, curSort])

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc} title={Collection.title}>
      <section className={sty.collectionBG} style={{ paddingTop: 60 }}>
        <Container>
          <nav className={sty.breadcrumb} style={{ marginBottom: '1em' }}>
            <PrismicLink href={`/catalog`} style={{ color: 'HighlightText' }}>
              Catalog
            </PrismicLink>{' '}
            &gt;
            {Collection.handle !== 'all-products' && (
              <>
                <PrismicLink
                  href={`/collection/all-products`}
                  style={{ color: 'HighlightText' }}
                >
                  All Products
                </PrismicLink>{' '}
                &gt;
              </>
            )}
            {Collection.title}
          </nav>
          <div style={{ marginBottom: 80 }}>
            <h1 style={{ fontStyle: 'italic', fontWeight: '500' }}>
              {Collection.title}
            </h1>
          </div>
          <div className={sty.Content}>
            <div className={sty.Filter}>
              <h2
                style={{
                  marginBottom: 20,
                  fontWeight: '500',
                  fontStyle: 'italic',
                  fontSize: '1.6em',
                }}
              >
                Filter by
              </h2>
              <details open className={sty.filterItem}>
                <summary className={sty.filterTitle}>Product Type </summary>
                {typesList.map((type, index) => (
                  <>
                    <label key={type} htmlFor={type} className={sty.value}>
                      {type}
                      <input
                        type="checkbox"
                        value={index}
                        name={type}
                        onChange={handleFilter}
                      />
                    </label>
                  </>
                ))}
              </details>
              <details open className={sty.filterItem}>
                <summary className={sty.filterTitle}>Product Tags </summary>
                {tagsList.map((tag, index) => (
                  <>
                    <label key={tag} htmlFor={tag} className={sty.value}>
                      {tag}
                      <input
                        type="checkbox"
                        value={index}
                        name={tag}
                        onChange={handleFilter}
                      />
                    </label>
                  </>
                ))}
              </details>
              {collectionsList.length > 0 && (
                <details open className={sty.filterItem}>
                  <summary className={sty.filterTitle}>Style</summary>
                  {collectionsList.map((collection, index) => (
                    <label
                      key={collection}
                      htmlFor={collection}
                      className={sty.value}
                    >
                      {collection}
                      <input
                        type="checkbox"
                        value={index}
                        name={collection}
                        onChange={handleFilter}
                      />
                    </label>
                  ))}
                </details>
              )}
            </div>
            <div className={sty.Box}>
              <div className={sty.searchBar}>
                <div className={sty.search}>
                  <label htmlFor="search">Search </label>
                  <input
                    name="search"
                    id="search"
                    type="text"
                    onChange={handleSearch}
                  />
                </div>
                <div className={sty.sort}>
                  <label htmlFor="sort">Sort by </label>
                  <select
                    name="sort"
                    id="sort"
                    onChange={handleSort}
                    defaultValue={'relevance'}
                  >
                    <option value={'relevance'}>Relevance</option>
                    <option value={'name'}>Name</option>
                  </select>
                </div>
              </div>
              {searchedData ? (
                <div className={sty.ProductGrid}>
                  {sortData(searchedData).map((item, index) => {
                    const price = item.priceRangeV2
                      ? getPrice(
                          location,
                          item.priceRangeV2.minVariantPrice.amount,
                        )
                      : 'N/A'

                    return (
                      <PrismicLink
                        href={`/product/${item.handle}`}
                        key={`product:${index}`}
                        className={sty.productCard}
                      >
                        <div className={sty.imageBox}>
                          {item?.featuredImage && (
                            <GatsbyImage
                              image={getShopifyImage({
                                image: item?.featuredImage,
                              })}
                              alt=""
                              className={sty.image}
                              imgStyle={{ objectFit: 'contain' }}
                            />
                          )}
                        </div>
                        <div style={{ padding: '0 10px' }}>
                          <p className={sty.itemTitle}>{item.title}</p>
                          <span
                            style={{ display: 'block' }}
                            className={sty.price}
                            dangerouslySetInnerHTML={{ __html: price }}
                          ></span>
                        </div>
                      </PrismicLink>
                    )
                  })}
                </div>
              ) : (
                <h3>No products available</h3>
              )}
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query CollectionQuery($id: String) {
    shopifyCollection(id: { eq: $id }) {
      handle
      title
      image {
        height
        originalSrc
        width
      }
      products {
        handle
        title
        productType
        tags
        featuredImage {
          originalSrc
          width
          height
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        title
      }
      metafields {
        namespace
        key
        value
      }
    }
    allShopifyCollection(
      filter: {
        metafields: {
          elemMatch: { key: { eq: "collection_type" }, value: { eq: "Styles" } }
        }
      }
    ) {
      nodes {
        handle
        title
        products {
          handle
          title
          productType
          tags
        }
      }
    }

    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(CollectionTemplate)
