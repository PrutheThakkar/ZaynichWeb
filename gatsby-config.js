require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `ZAYNICH® (cefepime and zidebactam) for Injection`,
    description: `Gatsby + WordPress (WPGraphQL) site`,
    author: `@ZAYNICH`,
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://zaynich.studiosentientdemo.com/",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.GATSBY_WPGRAPHQL_URL ||
          "https://zaynich.studiosentientdemo.com/graphql",
        develop: {
          hardCacheMediaFiles: true,   // ← cache images, stop re-fetching
          hardCacheData: false,
          nodeUpdateInterval: 300000,  // ← only check for WP changes every 5 mins (default is 5000ms = 5 sec)
        },
        production: {
          hardCacheMediaFiles: false,
        },
      },
    },
  ],
}