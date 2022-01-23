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
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
