export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'user',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/meta.js', '~/plugins/analytics.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    '@nuxtjs/sitemap',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  firebase: {
    config: {
      apiKey: process.env.NUXT_ENV_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.NUXT_ENV_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.NUXT_ENV_FIREBASE_CONFIG_PROJECT_ID,
      storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_ENV_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_ENV_ID,
      measurementId: process.env.NUXT_ENV_MEASUREMENT_ID,
    },
    services: {
      analytics: {
        collectionEnabled: true, // default
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
