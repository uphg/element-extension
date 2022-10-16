import { createLocalVue, mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

describe('input', () => {
  it('input v-model', async () => {
    const inputDemo = defineComponent({
      template: `
        <e-input ref="inputRef" v-model="input" />
      `,
      data() {
        return {
          input: ''
        }
      },
      methods: {
        setValue(value: string) {
          this.input = value
        }
      }
    })

    const wrapper = mount<any>(inputDemo, { localVue })
    const input = wrapper.vm.$el.querySelector('.el-input__inner') as HTMLInputElement
    expect(input.value).toBe('')
    wrapper.vm.setValue('hi')
    await wrapper.vm.$nextTick()
    expect(input.value).toBe('hi')
  })

  it('input slot:prefix', () => {
    const formDemo = {
      template: `
        <e-input>
          <template v-slot:prefix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </e-input>
      `
    }

    const wrapper = mount(formDemo, { localVue })
    expect(wrapper.find('.el-input__prefix .el-icon-search').exists()).toBeTruthy()
  })
})