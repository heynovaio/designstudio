import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText, PrismicText , PrismicLink } from '@prismicio/react'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
// import { getShopifyImage } from 'gatsby-source-shopify'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { getCurrencySymbol } from "../utils/format-price"
import { SearchProvider } from "../context/search-provider"
import { useProductSearch } from "../utils/hooks"
import { getValuesFromQuery } from "../utils/search"
import { CgChevronRight, CgChevronLeft, CgSmileNone } from "react-icons/cg"
import { Layout } from '../components/Layout'
import { Container, Button } from "../components/Components"


import * as sty from "./collection.module.scss"

const DEFAULT_PRODUCTS_PER_PAGE = 24



const CollectionTemplate = ({ data }) => {
  if (!data) return null

  const menu = data.prismicMenu || {}
  const Collection = data.shopifyCollection
  const activeDoc = {
    lang: 'en-ca',
    type: 'Collection',
    url: `/collection/${Collection.handle}/`,
    alternateLanguages: null,
  };



  const typesList = [];
  var types = Collection.products.map((prod, index) => 
      {prod.productType != "" && !typesList.includes(prod.productType) && typesList.push(prod.productType);}
  );
  typesList.sort(function(a, b) {
    if(a.toLowerCase() < b.toLowerCase()) return -1;
    if(a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
  });
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allData,setAllData] = React.useState([]);
  const [filteredData,setFilteredData] = React.useState(allData);
  const [searchedData,setSearchedData] = React.useState();

  React.useEffect(() => {
    setFilters(Array(typesList.length).fill(false));
    setAllData(Collection.products);
    setFilteredData(Collection.products);
    setSearchedData(Collection.products);
  }, []);
  const [curSort, setCurSort] = React.useState("relevance");
  const [filters, setFilters] = React.useState([]);

  const handleSort = (e) => {
    setCurSort(e.target.value);
  };

  function sortData(data){
    if(searchedData){
      switch(curSort){
        case 'relevance':{
          return data;
        };
        case 'name': {
          let temp = data;
          temp.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          });
          return temp;
        };
        default: return data;
      } 
    } else return data;
  }
  const handleFilter = (e) => {
    let index = e.target.value;
    const newFilters = [...filters];
    let val = !newFilters[index];
    newFilters[index] = val;
    setFilters(newFilters);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
  React.useEffect(() => {
    let curVals = [];
    filters.map((item,index) => {
      if(item === true){
        allData.map((a) => {
          if(a.productType === typesList[index]){
            curVals.push(a);
          }
        });
      }
    })
    if(curVals.length === 0){
      setFilteredData(allData);
    } else setFilteredData(curVals);
  },[filters]);

  React.useEffect(() => {
    let hits = [];
    let value = searchTerm;
    filteredData.map((prod,index) => prod.title.toLowerCase().includes(value) && hits.push(prod));
    setSearchedData(hits);
  },[filteredData, searchTerm, curSort]);

  return (
    <Layout menu={menu.data} activeDocMeta={activeDoc}>
      <section style={{paddingTop: 20}}>
        <Container>
          {/* {Collection.image && (
            <div className={sty.bannerWrap}>
            
              <GatsbyImage
                image={getShopifyImage({image: Collection.image, width: 1692, height: 326, layout: "constrained"})}
                alt=""
                className={sty.image}
              />
            </div>
          )} */}
          <div style={{marginBottom: 80}}>
            <h1 style={{fontSize:42, fontWeight: "600"}}>{Collection.title}</h1>
          </div>
          <div className={sty.Content}>
          
            <div className={sty.Filter}>
              <h3 style={{marginBottom:20, fontWeight: "500"}}>Filter</h3>
              <details className={sty.filterItem}>
                <summary className={sty.filterTitle}>Product Type </summary>
                {
                  typesList.map((item,index) => (
                    <>
                      <label htmlFor={item} className={sty.value}>
                        {item}
                        <input 
                          type="checkbox" 
                          value={index} 
                          name={item}
                          onChange={handleFilter}
                        />
                      </label>
                    </>
                  ))
                }
                
              </details>
              
            </div>
            <div className={sty.Box}>
              <div className={sty.searchBar}>
                <div className={sty.search}>
                  <label htmlFor="search">Search  </label>
                  <input
                    name="search"
                    type="text"
                    onChange={handleSearch}
                  />
                </div>
                <div className={sty.sort}>
                  <label htmlFor="sort">Sort by </label>
                  <select
                    name="sort"
                    onChange={handleSort}
                    defaultValue={"relevance"}
                  >
                      <option value={"relevance"} >Relevance</option>
                      <option value={"name"} >Name</option>
                    </select>
                </div>
              </div>
              {searchedData ? 
                (<div className={sty.ProductGrid}>
                  {sortData(searchedData).map((item,index) => (
                    <PrismicLink 
                      href={`/product/${item.handle}`} 
                      key={`product:${index}`}
                      className={sty.productCard}
                    >
                      <div className={sty.imageBox}>
                        {/* {item.featuredImage &&
                          <GatsbyImage 
                            image={getShopifyImage({image: item.featuredImage})}
                            alt=""
                            className={sty.image}
                            imgStyle={{objectFit: 'contain'}}
                          />
                        } */}
                        
                      </div>
                      <div style={{padding: "0 10px"}}>
                        <p className={sty.itemTitle}>{item.title}</p>
                        <span className={sty.price}>${item.priceRangeV2.minVariantPrice.amount} {item.priceRangeV2.minVariantPrice.currencyCode}</span>
                      </div>
                    </PrismicLink>
                  ))}
                </div>) :
                <h3>No products available</h3>
              }
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
    }
    prismicMenu(lang: { eq: "en-ca" }) {
      ...TopMenuFragment
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(CollectionTemplate)
