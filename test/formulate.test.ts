import { mount } from '@vue/test-utils'
import { nextTick } from 'process'
import Vue from 'vue'
import { Formulate } from '../src/index'

describe('form', () => {

  it('label width', async () => {
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

  it('auto label width', async () => {
    expect(Formulate).toBeTruthy()

    const data = {
      labelWidth: 'auto',
      fileds: {
        name: { label: '活动名称' },
        remark: { label: '活动备注内容' }
      }
    }
    const wrapper = mount(Formulate, {
      propsData: {
        data,
      },
    })
    expect(wrapper.props().data).toBe(data)
    const formItems = wrapper.vm.$el.querySelectorAll('.el-form-item__content')
    const marginLeft = parseInt(formItems[0].style.marginLeft, 10)
    const marginLeft2 = parseInt(formItems[1].style.marginLeft, 10)
    expect(marginLeft).toBe(marginLeft2)
  })

})
