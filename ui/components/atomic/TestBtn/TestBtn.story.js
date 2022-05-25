import { screen, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import TestBtn from './Index.vue'
import readme from './TestBtn.md'

// import { action } from '@storybook/addon-actions';

export default {
  title: 'TestBtn',
  component: TestBtn,
  args: {
    color: 'primary',
    depressed: false,
    icon: false,
    outlined: false,
    plain: false,
    rounded: false,
    fab: false,
    text: false,
    block: false,
    disabled: false,
    large: false,
    loading: false,
    small: false,
    xLarge: false,
    xSmall: false
  },
  argTypes: {
    click: { action: true },
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'info', 'warning', 'error', 'success']
    }
  },
  decorators: [
    () => ({
      template: '<story />'
    })
  ],
  parameters: {
    docs: {
      source: {
        code: '<TestBtn :color="color" />'
      },
      description: {
        component: readme
      }
    }
  }
}

const BtnTemplate = (args, { argTypes }) => ({
  components: { TestBtn },
  props: Object.keys(argTypes),
  template: '<TestBtn v-bind="$props" v-on="$props" />'
})

export const Primary = BtnTemplate.bind({})
Primary.parameters = {
  jest: ['TestBtn.spec.ts']
}

Primary.play = async ({ args, canvasElement }) => {
  const btn = screen.getByText('primary')
  await userEvent.click(btn)
  await expect(args.click).toHaveBeenCalled()
}
