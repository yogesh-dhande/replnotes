const isDev = process.env.NODE_ENV === "development";

const axios = require("axios");

async function getAppRoutes() {
  let res = await axios.get(
    `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/getRoutes`
  );
  return res.data;
}

export default {
  dev: isDev,
  components: [{ path: "~/../components" }],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "REPL Notes",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:title", property: "og:title", content: "REPL Notes" },
      {
        hid: "description",
        name: "description",
        content: "Blog with Jupyter Notebooks @ REPL Notes"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Blog with Jupyter Notebooks @ REPL Notes"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: process.env.NUXT_ENV_BASE_URL
      },
      { hid: "og:image", property: "og:image", content: "~/static/logo.png" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/firebaseConfig.js",
    "~/plugins/analytics.client.js",
    "~/plugins/meta.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/firebase",
    "@nuxtjs/pwa",
    "@nuxtjs/sitemap"
  ],
  sitemap: {
    hostname: process.env.NUXT_ENV_BASE_URL,
    async routes() {
      let routes = await getAppRoutes();
      return routes;
    },
    exclude: ["/dashboard"]
  },
  firebase: {
    config: {
      apiKey: process.env.NUXT_ENV_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.NUXT_ENV_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.NUXT_ENV_FIREBASE_CONFIG_PROJECT_ID,
      storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_ENV_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_ENV_ID,
      measurementId: process.env.NUXT_ENV_MEASUREMENT_ID
    },
    services: {
      auth: {
        persistence: "local", // default
        initialize: {
          onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false
        },
        ssr: true // default
        // emulatorPort: isDev ? 10000 : undefined,
        // emulatorHost: isDev ? 'http://localhost' : undefined,
      },
      functions: {
        location: "us-central1"
        // emulatorPort: isDev ? 10001 : undefined,
        // emulatorHost: isDev ? 'localhost' : undefined,
      },
      firestore: {
        memoryOnly: false, // default
        enablePersistence: !isDev
        // emulatorPort: isDev ? 10002 : undefined,
        // emulatorHost: isDev ? 'localhost' : undefined,
      },
      storage: true,
      analytics: {
        collectionEnabled: true // default
      }
    }
  },
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        "/firebase-auth-sw.js"
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  axios: {
    baseURL: process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]]
    }
  }
};
