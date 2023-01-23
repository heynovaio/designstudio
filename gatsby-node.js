const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const queryData = await graphql(`
    {
      allPrismicHome {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicProject {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicCatalog {
        nodes {
          id
          lang
          url
        }
      }
      allShopifyProduct {
        nodes {
          id
          handle
        }
      }
      allShopifyCollection {
        nodes {
          id
          handle
        }
      }
      
    }
  `)

  queryData.data.allPrismicHome?.nodes?.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/home.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allShopifyProduct.nodes.forEach((page) => {
    createPage({
      path: `/product/${page.handle}/`,
      component: path.resolve(__dirname, 'src/templates/product.js'),
      context: {
        id: page.id,
        lang: 'en-ca',
        type: 'product',
      },
    })
  })
  queryData.data.allShopifyCollection.nodes.forEach((page) => {
    createPage({
      path: `/collection/${page.handle}/`,
      component: path.resolve(__dirname, 'src/templates/collection.js'),
      context: {
        id: page.id,
        lang: 'en-ca',
        type: 'collection',
      },
    })
  })
  queryData.data.allPrismicPage.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicProject.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/project.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicCatalog.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/catalog.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  // queryData.data.allPrismicCatalog.nodes.forEach((page) => {
  //   createPage({
  //     path: page.url,
  //     component: path.resolve(__dirname, 'src/templates/catalog.js'),
  //     context: {
  //       id: page.id,
  //       lang: page.lang,
  //       uid: page.uid,
  //     },
  //   })
  // })
  // queryData.data.allPrismicProject.nodes.forEach((page) => {
  //   createPage({
  //     path: page.url,
  //     component: path.resolve(__dirname, 'src/templates/project.js'),
  //     context: {
  //       id: page.id,
  //       lang: page.lang,
  //       uid: page.uid,
  //     },
  //   })
  // })
}
