import { createLocalVue, mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

describe('button', () => {
  it('view', async () => {
    const buttonDemo = {
      template: `
        <e-button>hi</e-button>
      `
    }

    const wrapper = mount<any>(buttonDemo, { localVue })
    
    expect(wrapper.find('.el-button').exists()).toBeTruthy()
    expect(wrapper.find('.el-button').text()).toBe('hi')
  })

  it('onClick props', () => {
    vi.useFakeTimers()
    const buttonDemo = defineComponent({
      template: `
        <e-button :on-click="onClick">hi</e-button>
      `,
      data() {
        return {
          clicked: false
        }
      },
      methods: {
        onClick() {
          this.clicked = true
        }
      }
    })

    const wrapper = mount<any>(buttonDemo, { localVue })
    const button = wrapper.vm.$el as HTMLButtonElement
    button.click()
    setTimeout(() => {
      expect(wrapper.vm.clicked).toBeTruthy()
    }, 100)
    vi.clearAllTimers()
  })

  it('click emit', () => {
    vi.useFakeTimers()
    const buttonDemo = defineComponent({
      template: `
        <e-button @click="onClick">hi</e-button>
      `,
      data() {
        return {
          clicked: false
        }
      },
      methods: {
        onClick() {
          this.clicked = true
        }
      }
    })

    const wrapper = mount<any>(buttonDemo, { localVue })
    const button = wrapper.vm.$el as HTMLButtonElement
    button.click()
    setTimeout(() => {
      expect(wrapper.vm.clicked).toBeTruthy()
    }, 100)
    vi.clearAllTimers()
  })
})