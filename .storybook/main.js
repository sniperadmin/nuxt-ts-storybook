const { nuxifyStorybook } = require('../.nuxt-storybook/storybook/main.js')

module.exports = nuxifyStorybook({
  webpackFinal(config, options) {

    // extend config here

    return config
  },

  stories: [
    '~/components/**/*.story.@(ts|js)',
  ],
  addons: [
    '@storybook/addon-jest',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y/register',
    '@storybook/addon-interactions/register',
  ],
  features: {
    interactionsDebugger: true,
  },
})
