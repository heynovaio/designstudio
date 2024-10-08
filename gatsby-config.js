const path = require('path')
const dotenv = require('dotenv').config()

const prismicConfig = require('./prismic-configuration')

module.exports = {
  siteMetadata: {
    title: `Design Studio`,
    description:
      'Transform your home with luxury interior design and custom furniture collections from our award-winning studio in Grand Cayman and Turks & Caicos. Over 30 years of expertise in creating timeless spaces. Shop our designer-curated decor and furniture.',
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
        salesChannel: process.env.SHOPIFY_STOREFRONT,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Open Sans\:400,600,700`,
          `Poppins\:400,600,700`,
          `Playfair Display\:italic,400,600,700`,
          `Poller One\:400`,
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'wpa8mum',
        },
      },
    },
    `gatsby-plugin-scroll-reveal`,
    `gatsby-plugin-transition-link`,
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
