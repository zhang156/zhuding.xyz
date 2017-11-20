module.exports = {
  plugins: [
    {src: '~/plugins/TweenLite'},
    {src: '~/plugins/dateFormat'},
    {src: '~/plugins/marked'},
    {src: '~/plugins/highlight'},
    {src: '~/plugins/element-ui'},
    {src: '~/plugins/swiper', ssr: false},
    {src: '~/plugins/image-popup', ssr: false},
    {src: '~/plugins/copy', ssr: false}
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'zhuding.xyz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/ocean.css',
    'element-ui/lib/theme-chalk/index.css',
    {src: '~assets/sass/app.scss', lang: 'sass'}
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    vendor: [
      'swiper',
      'axios',
      'marked',
      'element-ui'
    ]      
  }
}
