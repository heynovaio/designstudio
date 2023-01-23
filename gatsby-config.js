const path = require('path')
const dotenv = require('dotenv').config()

const prismicConfig = require('./prismic-configuration')

module.exports = {
  siteMetadata: {
    title: 'Basic HeyNova Prismic Build',
    description: 'Barebones prismic starter with Prismic CMS & Gatsby.js for HeyNova Projects',
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: prismicConfig.prismicRepo,  
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: require('./src/utils/linkResolver').linkResolver,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        downloadImages: true,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open Sans\:400,600,700`, `Poppins\:400,600,700`, `Playfair Display\:400,600,700`,`Poller One\:400`, `Poller One\:400`],
        display: 'swap',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: path.resolve(__dirname, 'src', 'images', 'favicon-32x32.png'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src', 'images'),
      },
    },
  ],
}
