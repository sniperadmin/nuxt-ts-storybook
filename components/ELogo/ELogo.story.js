import ELogo from './ELogo.vue'
// import LogoDocs from './ELogo.md'

import { withTests } from '@storybook/addon-jest';
// import results from '@/.jest-test-results.json';

export default {
  title: 'ELogo',
  component: ELogo,
  args: {},
  argTypes: {},
  decorators: [
    // withTests({ results }),
    () => ({
      template: `<story />`
    })
  ],
  parameters: {
    docs: {
      source: {
        code: `<ELogo />`
      },
      description: {
        // component: LogoDocs,
      }
    }
  }
}

const LogoTemp = (args, { }) => ({
  components: { ELogo },
  // props: Object.keys(argTypes),
  template: `<ELogo />`
})

export const Logo = LogoTemp.bind({})
