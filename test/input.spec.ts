import { createLocalVue, mount } from "@vue/test-utils"
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

describe('input', () => {
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