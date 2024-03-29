import path from 'path'
import colors from 'vuetify/es5/util/colors'
import { NuxtConfig } from '@nuxt/types'
import i18n from './config/i18n'

const nuxtConfig: NuxtConfig = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  srcDir: 'ui',
  modern: 'client',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-ts-storybook',
    title: 'nuxt-ts-storybook',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/storybook.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/inversify'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'fr',
        name: 'Francais'
      },
      {
        code: 'es',
        name: 'Espaniol'
      },
      {
        code: 'ar',
        name: 'العربية'
      }
    ],
    defaultLocale: 'en',
    vueI18n: i18n
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  storybook: {
    port: 6006,
    decorators: [
      // VApp decorator for Vuetify
      // `<v-app dark id='vuetify-storybook-decorator'><div><story/></div></v-app>`,
    ],
    parameters: {}
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    // treeShake: true,
    options: {
      // customProperties: true,
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#77A11D',
          accent: colors.grey.darken3,
          secondary: '#C76758',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      // @ts-ignore "Property 'buildContext' does not exist on type 'NuxtOptionsBuild'"
      const rootDir = this.buildContext.options.rootDir
      const joinSrc = (s: string) => path.join(rootDir, '.', s)

      if (!config.resolve!.alias) {
        throw new Error('Webpack config aliases not found!')
      }

      config.resolve!.alias['@'] = joinSrc('ui')
      config.resolve!.alias['~'] = joinSrc('app')

      config.node = {
        fs: 'empty'
      }

      config.module!.rules.push({
        enforce: 'pre',
        test: /\.txt$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/
      })
    }
  }
}

export default nuxtConfig
