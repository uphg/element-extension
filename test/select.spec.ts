import { createLocalVue, mount } from "@vue/test-utils"
import ElementPart from '../src/index'

const localVue = createLocalVue()
localVue.use(ElementPart)

describe('select', () => {
  
  it('options', async () => {
    const formDemo = {
      template: `
        <e-select
          v-model="region"
          placeholder="请选择区域"
          :options="[
            { label: '区域一', value: 0 },
            { label: '区域二', value: 1 },
            { label: '区域三', value: 2 }
          ]"/>
      `,
      data: () => ({ region: 0 })
    }

    const wrapper = mount(formDemo, { localVue })
    const input = wrapper.find('.el-select .el-input__inner').element as HTMLInputElement
    expect(input.placeholder).toBe('请选择区域')

    await wrapper.vm.$nextTick(() => {})
    expect(input.value).toBe('区域一')

    await wrapper.destroy()
  })

  it('option-groups', async () => {
    const formDemo = {
      template: `
        <e-select
          label="活动区域"
          v-model="region"
          :option-groups="options"
        />
      `,
      data: () => ({
        region: 'Chengdu',
        options: [{
          label: '热门城市',
          options: [
            { value: 'Shanghai', label: '上海' },
            { value: 'Beijing', label: '北京' }
          ]
        }, {
          label: '城市名',
          options: [
            { value: 'Chengdu', label: '成都' },
            { value: 'Shenzhen', label: '深圳' },
            { value: 'Guangzhou', label: '广州' },
            { value: 'Dalian', label: '大连' }
          ]
        }]
      })
    }

    const wrapper = mount(formDemo, { localVue })
    const input = wrapper.find('.el-select .el-input__inner').element as HTMLInputElement
    await wrapper.vm.$nextTick(() => {})
    expect(input.value).toBe('成都')

    await wrapper.destroy()
  })

  it('options slot:options', async () => {
    const formDemo = {
      template: `
        <e-select
          v-model="region"
          placeholder="请选择活动区域"
          popper-class="options-slot-demo"
          :options="[
            { label: '区域一', value: 0 },
            { label: '区域二', value: 1 },
          ]"
        >
          <template v-slot:options="slotProps">
            <span class="slot-label">{{ slotProps.label }}</span>
            <span class="slot-value">{{ slotProps.value }}</span>
          </template>
        </e-select>
      `,
      data: () => ({
        region: ''
      })
    }

    const wrapper = mount(formDemo, { localVue })
    wrapper.trigger('click')
    await wrapper.vm.$nextTick(() => {})
    const selectDropdown =  document.querySelector('.options-slot-demo')
    const dropdownList = selectDropdown?.querySelectorAll('.el-select-dropdown__list .el-select-dropdown__item')
    expect(dropdownList?.[0].querySelector('.slot-label')?.textContent).toBe('区域一')
    expect(dropdownList?.[0].querySelector('.slot-value')?.textContent).toBe('0')
    expect(dropdownList?.[1].querySelector('.slot-label')?.textContent).toBe('区域二')
    expect(dropdownList?.[1].querySelector('.slot-value')?.textContent).toBe('1')

    await wrapper.destroy()
  })

  it('option-groups slot:options', async () => {
    const formDemo = {
      template: `
        <e-select
          popper-class="option-groups-slot-demo"
          v-model="region"
          placeholder="请选择地区"
          :option-groups="optionGroups"
        >
          <template v-slot:options="slotProps">
            <span class="slot-label">{{ slotProps.label }}</span>
            <span class="slot-value">{{ slotProps.value }}</span>
          </template>
        </e-select>
      `,
      data: () => ({
        region: '',
        optionGroups: [{
          label: '热门城市',
          options: [
            { value: 'Shanghai', label: '上海' },
            { value: 'Beijing', label: '北京' }
          ]
        }, {
          label: '城市名',
          options: [
            { value: 'Chengdu', label: '成都' },
            { value: 'Shenzhen', label: '深圳' },
            { value: 'Guangzhou', label: '广州' },
            { value: 'Dalian', label: '大连' }
          ]
        }]
      })
    }

    const wrapper = mount(formDemo, { localVue })
    wrapper.trigger('click')
    await wrapper.vm.$nextTick(() => {})
    const selectDropdown = document.querySelector('.option-groups-slot-demo')
    const dropdownGroup = selectDropdown?.querySelector('.el-select-group')
    const groupItems =  dropdownGroup?.querySelectorAll('.el-select-dropdown__item')

    expect(groupItems?.[0].querySelector('.slot-label')?.textContent).toBe('上海')
    expect(groupItems?.[0].querySelector('.slot-value')?.textContent).toBe('Shanghai')
    expect(groupItems?.[1].querySelector('.slot-label')?.textContent).toBe('北京')
    expect(groupItems?.[1].querySelector('.slot-value')?.textContent).toBe('Beijing')
    wrapper.destroy()
  })

})