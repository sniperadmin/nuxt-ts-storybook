import ELogo from './Index.vue'
import LogoDocs from './ELogo.md'

export default {
  title: 'ELogo',
  component: ELogo,
  args: {},
  argTypes: {},
  decorators: [
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
Logo.parameters = {
  jest: ['ELogo.spec.ts']
}
