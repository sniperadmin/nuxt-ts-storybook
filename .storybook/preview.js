export * from '~~/.nuxt-storybook/storybook/preview.js'
import EgabTheme from './EgabTheme'

import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';

import nuxtConfig from '../nuxt.config'

let currentLocale = nuxtConfig.i18n.defaultLocale;

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: currentLocale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
        { value: 'ar', right: '🇪🇬', title: 'Arabic' },
      ],
    },
  },
};

export const decorators = [
  withTests({
    results,
  }),
  (story) => `<v-app dark id='vuetify-storybook-decorator'><div><story/></div></v-app>`,
  (_, { globals }) => {
    if (globals.locale !== currentLocale) {
      currentLocale = globals.locale;
    }
    return {
      template: '<story />',
      created() {
        if (this.$i18n) {
          this.$i18n.setLocale(currentLocale);
        }
      },
      updated() {
        if (this.$i18n) {
          this.$i18n.setLocale(currentLocale);
        }
      }
    }
  },
];

// export const parameters = {
//   docs: {
//     theme: EgabTheme
//   },
// }
