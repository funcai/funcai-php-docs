const { description } = require('../../package')
const path = require("path")
const webpack = require('webpack')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'FuncAI PHP',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Applications',
        link: '/applications/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/funcai/funcai-php'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'installation',
            'architecture',
          ]
        }
      ],
      '/applications/': [
        {
          title: 'Applications',
          collapsable: false,
          children: [
            '',
            'image-stylization',
            'image-classification',
            'more',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  chainWebpack: config => {
    config.resolve.alias.set('@images', path.resolve(__dirname, "../images"))
    config.plugin('define').use(
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL || 'http://localhost/api'),
      })
    )
    
  }
}
