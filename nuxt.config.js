export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hotspringplus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'text/javascript',
        src: "../js/tabler.min.js",
        body: true,
      },
      {
        type: 'text/javascript',
        src: "../js/demo.min.js",
        body: true,
      },  
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tabler.min.css',
    '~/assets/css/tabler-flags.min.css',
    '~/assets/css/tabler-payments.min.css',
    '~/assets/css/tabler-vendors.min.css',
    '~/assets/css/demo.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/repositories.js',
    '~/plugins/bootstrap.js',
    '~/plugins/vue-swal.js',
    '~/plugins/vue-toggle.js',
    '~/plugins/qr.js',
    '~/plugins/readmore.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    "@nuxtjs/dotenv",
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  bootstrapVue: {
    bootstrapCSS: true, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: false,
  },  

  router: {
    middleware: ['auth']
  },

  loading: {
    color: "#DA2C16"
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.LARAVEL_ENDPOINT
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  auth:{
    redirect: {
        login:'/login',
        logout:'/',
        callback: '/auth/callback',
        user:'/'
    },
    strategies: {
        'laravelJWT': {
            provider: 'laravel/jwt',
            url: process.env.LARAVEL_ENDPOINT,
            endpoints: {
                login: { url: '/api/login', method: 'post'},
                refresh: { url: '/api/auth/refresh', method: 'post' },
                user: { url: '/api/auth/me', method: 'get' },
                logout: { url: '/logout', method: 'post' },
                userInfo: { url: '/api/auth/me', method: 'get' },
            },
            token: {
              property: 'access_token',
              maxAge: 60 * 60
            },
            refreshToken: {
              maxAge: 20160 * 60
            },
        },
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
