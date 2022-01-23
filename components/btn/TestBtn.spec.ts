import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import TestBtn from '@/components/btn/TestBtn.vue'


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
})
