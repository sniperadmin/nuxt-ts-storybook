export * from '~~/.nuxt-storybook/storybook/preview.js'
// import EgabTheme from './EgabTheme'

import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';

export const decorators = [
  withTests({
    results,
  }),
  (story) => `<v-app dark id='vuetify-storybook-decorator'><div><story/></div></v-app>`,
];

// export const parameters = {
//   docs: {
//     theme: EgabTheme
//   },
// }
