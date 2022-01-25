import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import TestBtn from './Index.vue'


let wrapper: any;

describe('TestBtn', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(TestBtn, {
      localVue,
      propsData: {
        color: 'primary'
      },
      slots: {
        default: 'Jest default title'
      }
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render slot', () => {
    const btn = wrapper.find('[data-test="btn"]')
    expect(btn.text()).toBe('Jest default title')
  });

  it.todo('should render an outlined btn')
  it.todo('should render an icon btn')
  it.todo('should render a depressed btn')
  it.todo('should render a plain btn')
  it.todo('should render a rounded btn')
  it.todo('should render a fab btn')
  it.todo('should render a text btn')
  it.todo('should render a block btn')
  it.todo('should render a small btn')
  it.todo('should render a x-small btn')
  it.todo('should render a large btn')
  it.todo('should render a x-large btn')
  it.todo('should render a disabled btn')
  it.todo('should render a loading btn')
  it.todo('should handle click events')

  /**
   * :depressed="depressed"
    :icon="icon"
    :outlined="outlined"
    :plain="plain"
    :rounded="rounded"
    :fab="fab"
    :text="text"
    :block="block"
    :disabled="disabled"
    :large="large"
    :loading="loading"
    :small="small"
    :x-large="xLarge"
    :x-small="xSmall"
    v-on:click="$emit('click', $event)"
   */
})
