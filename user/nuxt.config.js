import path from 'path'
const isDev = process.env.NODE_ENV === 'development'

const deployTarget = process.env.DEPLOY_TARGET || 'staging'
console.log(deployTarget)

require('dotenv').config({
  path: path.resolve(__dirname, `envs/.env.${deployTarget}.local`),
})

export default {
  dev: isDev,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'user',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:title', property: 'og:title', content: 'REPL Notes' },
      {
        hid: 'description',
        name: 'description',
        content: 'Blog with Jupyter Notebooks @ REPL Notes',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Blog with Jupyter Notebooks @ REPL Notes',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.NUXT_ENV_BASE_URL,
      },
      { hid: 'og:image', property: 'og:image', content: '~/static/logo.png' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebaseConfig.js',
    '~/plugins/analytics.client.js',
    '~/plugins/meta.js',
  ],

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
      firestore: {
        memoryOnly: false, // default
        enablePersistence: !isDev,
        // emulatorPort: isDev ? 10002 : undefined,
        // emulatorHost: isDev ? 'localhost' : undefined,
      },
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
