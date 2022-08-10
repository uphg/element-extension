import { mount } from '@vue/test-utils'
import { Formulate } from '../src/index'

test('mount component', async () => {
  expect(Formulate).toBeTruthy()

  const data = {
    labelWidth: '80px',
    fileds: {
      name: { label: '活动名称' }
    }
  }
  const wrapper = mount(Formulate, {
    propsData: {
      data,
    },
  })
  expect(wrapper.props().data).toBe(data)
  expect(wrapper.vm.$el.querySelector('.el-form-item__label').style.width).toBe('80px')
  expect(wrapper.vm.$el.querySelector('.el-form-item__content').style.marginLeft).toBe('80px')

  wrapper.destroy()
})
