import { MonacoEditorPlugin } from './plugins/monacoEditor';
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - quiz-script',
    title: 'quiz-script',
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
  css: ['~/assets/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/day.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // sass変数書き換えたりするので, devでもtreeShakeしたい.
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#2cb8d1',
          info: '#D0EDFE',
          green: '#6FCF97',
          black: '#0A0A0A',
          background: '#363636',
          secondary: '#f08080',
          blue: '#2962FF',
          error: '#ff1744',
        }
      },
      // NOTE: SFCでcss変数を使える.
      // https://vuetifyjs.com/ja/features/theme/#section-30ab30b930bf30e030d730ed30d130c630a3
      options: {
        customProperties: true
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['javascript', 'typescript', 'html', 'cpp'],
      }),
    ],
  },
};
