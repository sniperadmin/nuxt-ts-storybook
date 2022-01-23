import TestBtn from './TestBtn.vue'
import readme from '../../README.md'

export default {
  title: 'TestBtn',
  component: TestBtn,
  args: {
    color: 'primary'
  },
  argTypes: {
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'info', 'warning', 'error', 'success'],
    }
  },
  decorators: [
    () => ({
      template: `<v-row justify="center"><v-col><story /></v-col></v-row>`
    })
  ],
  parameters: {
    docs: {
      source: {
        code: '<TestBtn />'
      },
      description: {
        component: readme,
      }
    }
  }
}

const BtnTemplate = (args, { argTypes }) => ({
  components: { TestBtn },
  props: Object.keys(argTypes),
  template: `<TestBtn :color="color" />`,
})

export const Primary = BtnTemplate.bind({})
