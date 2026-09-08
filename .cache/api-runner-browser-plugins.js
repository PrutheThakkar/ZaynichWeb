module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"https://zaynich.studiosentientdemo.com/graphql","develop":{"hardCacheMediaFiles":true,"hardCacheData":false,"nodeUpdateInterval":300000},"production":{"hardCacheMediaFiles":false,"allow404Images":false,"allow401Images":false},"verbose":true,"catchLinks":true},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
