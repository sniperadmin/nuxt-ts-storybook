import TestBtn from './TestBtn.vue'
import readme from './TestBtn.md'
import { withTests } from '@storybook/addon-jest';
import results from '@/.jest-test-results.json';

import { fireEvent, within, screen, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'TestBtn',
  component: TestBtn,
  args: {
    color: 'primary'
  },
  argTypes: {
    onClick: { action: true },
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'info', 'warning', 'error', 'success'],
    }
  },
  decorators: [
    withTests({ results }),
    () => ({
      template: `<v-row justify="center"><v-col><story /></v-col></v-row>`
    })
  ],
  parameters: {
    docs: {
      source: {
        code: `<TestBtn :color="color" />`
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
Primary.parameters = {
  jest: ['TestBtn.spec.ts'],
}

Primary.play = async ({ args, canvasElement }) => {
  const btn = screen.getByTestId('btn')
  await userEvent.click(btn)
  // const canvas = within(canvasElement);
  // await fireEvent.click(canvas.getByTestId('btn'))
  await expect(args.onClick).toHaveBeenCalledTimes(1)
}
