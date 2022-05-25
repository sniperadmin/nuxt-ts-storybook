import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import ELogo from './Index.vue'


let wrapper: any;

describe('ELogo', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(ELogo, {
      localVue,
      propsData: {}
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
